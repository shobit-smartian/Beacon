var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;
var multer = require('multer');
var mp3Duration = require('mp3-duration');
var mm = require('music-metadata');
const util = require('util');
var upload = multer({
    dest: 'uploads/'
});
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
request = require('request-json');

var jwt = require('jsonwebtoken');
var encKey = 'shhhhh';

var client = request.createClient('http://localhost:3000');
var speech_to_text = new SpeechToTextV1({
    "url": "https://stream.watsonplatform.net/speech-to-text/api",
    "username": "e2023a1c-7c4e-4ea6-ad61-a56b25c696a6",
    "password": "TwQg7uNEb03l"
});
var user = require("./users");
var User = user.User;

var recommendation = require('./recommendations');

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

//model require
var Transcript = require('./../model/transcript.js');
var Interview = require('./../model/interview.js');
var Transcript_data = require('./../model/transcript_data.js');


// Create the service wrapper
var toneAnalyzer = new ToneAnalyzerV3({
    // If unspecified here, the TONE_ANALYZER_USERNAME and TONE_ANALYZER_PASSWORD environment properties will be checked
    // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
    "username": "6ecc49d4-e7a0-4ecd-9faf-597147871e19",
    "password": "qPiEjiYgSNja",
    version_date: '2016-05-19'
});

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const nlu = new NaturalLanguageUnderstandingV1({
    "username": "ba9e66b2-9bed-4c25-8655-e0ffe3370401",
    "password": "4dibe48HObPh",
    version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2016_01_23
});
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})
var Utils = require('util');

/*var Transcription = mongoose.model('Transcription', new Schema({
user: { type: Schema.Types.ObjectId, ref: 'Story' },
tags:[],
factor: Number,
type: Number //0 Recommendations,1 Danger
}));
*/
exports.startLiveRec = function (req, res) {
    var transObj = new Transcript({
        user_id: req.user._id,
        patient_id: req.params.patientId
    });
    transObj.save(function (err, resp) {
        if (err) {
            res.jsonp({msg: err})
        } else {
            if (resp) {
                res.status(200).jsonp({data: resp});
            }
        }
    })


};


exports.uploadAudio = function (req, res, next) {

    const fileString = req.body.audioStr.replace(`data:audio/wav;base64,`, '');
    const binaryData = new Buffer(fileString, 'base64').toString('binary');

    const uploadPath = `uploads/audio${new Date().getMilliseconds()}.wav`;
    const interview = new Interview({
        markers: req.body.timeStamps,
        blob_str: uploadPath,
        user: req.params.user,
        media_length: req.body.length
    });

    interview.save(function (err, result) {

        console.log(err)

        if (err)
            return res.status(500).json({
                success: false,
                message: "Recording was not upload due to an internal error",
                err: err
            });

        fs.writeFile(uploadPath, binaryData, 'binary', function (err) {

            if (err) {
                res.send("failed to save");
            } else {
                var transObj = new Transcript({
                    user_id: req.params.user,
                    transcript_duration: req.body.length
                });
                /*transObj.save(function(err, resp) {
                        // Transcript.update({_id : resp._id },{$set : { transcript_duration : req.body.length}}).exec(function(error1,update){
                        // 	if(!err){
                        // 		console.log("update",update);
                        // 	}
                        // })
                    // process.emit("transcriptionId",{user:req.user.socketId,transcriptionId:resp._id})
                    if (err) {
                        console.log(err);
                    } else {
                        if (resp) {
                            var params = {
                                'model': 'en-US_NarrowbandModel',
                                'content_type': 'audio/wav',
                                'interim_results': true,
                                'max_alternatives': 1,
                                'word_confidence': false,
                                'speakerLabels': true,
                                'formattedMessages': [],
                                'timestamps': false,
                                'speaker_labels': true,
                                'keywords': ['colorado', 'tornado', 'tornadoes'],
                                'keywords_threshold': 0.5
                            };

                            jwt.verify(req.params.userId, encKey, function(err, decoded) {
                                if (!err) {
                                    User.findOne({
                                        _id: decoded["_doc"]._id
                                    }).exec(function(err, user) {
                                        if (!err) {

                                        }
                                    })
                                }
                            });

                            // Create the stream.
                            var recognizeStream = speech_to_text.createRecognizeStream(params);
                            // Pipe in the audio.
                            fs.createReadStream(uploadPath).pipe(recognizeStream);
                            // Get strings instead of buffers from 'data' events.
                            recognizeStream.setEncoding('utf8');
                            // Listen for events.
                            recognizeStream.on('results', function(event) {
                                onEvent('Results:', event, req.params.user);
                            });
                            recognizeStream.on('data', function(event) {
                                onEvent('Data:', event, req.params.user);
                            });
                            recognizeStream.on('error', function(event) {
                                onEvent('Error:', event, req.params.user);
                            });
                            recognizeStream.on('close', function(event) {
                                onEvent('Close:', event, req.params.user);
                            });
                            recognizeStream.on('speaker_labels', function(event) {
                                onEvent('Speaker_Labels:', event, req.params.user);
                            });


                            var speaker = 0;
                            var transcript = "";
                            var oldTrans = "";
                            var toneCount = 1;
                            var oldTone = {};
                            var trs = "";
                            var trans = [];
                            var lastSp = 0;
                            var lastIndex = 0;
                            var speakers = [],
                                lastCnt = 0;
                            var results=[];

                            function onEvent(name, event, socket) {
                                var translation=[];
                                //console.log('===****===\n\n',Utils.inspect(event,false,null),'\n\n===****===');
                                var result = JSON.parse(JSON.stringify(event));
                                if(result.results){
                                    results=result.results
                                }

                                if (result.speaker_labels){
                                  //if (event.speaker_labels.length == this.results[0].alternatives[0].timestamps.length && event.speaker_labels.length != this.lastCnt){
                                    for(let k=0; k< results.length; k++){
                                      if(results[k].alternatives[0].timestamps){
                                        for (let i = 0; i < result.speaker_labels.length; i++){
                                          for(let j =0; j < results[k].alternatives[0].timestamps.length; j++){
                                            if(results[k].alternatives[0].timestamps[j][1]==event.speaker_labels[i].from){
                                              //console.log(this.results[k].alternatives[0])
                                              //console.log(this.results[k].alternatives[0].timestamps[j])
                                              trans.push({'speaker':event.speaker_labels[i].speaker, 'transcript':results[k].alternatives[0].timestamps[j][0]});
                                            }
                                          }
                                        }
                                      }
                                    }
                                    for(var i=0; i< trans.length; i++){
                                      if(translation.length==0 || lastSp!=trans[i].speaker){
                                        translation.push({"speaker":trans[i].speaker,"transcript":trans[i].transcript})
                                      }else{
                                        translation[translation.length-1].transcript+=" "+trans[i].transcript;
                                      }
                                      lastSp=trans[i].speaker;
                                    }
                                    // process.emit('watson', {
                                    // 		trans: translation,
                                    // 		user: socket,
                                    // 		patient:req.body.patient_id
                                    // 	});
                                }
                                if (name == "Results:") {
                                    //var result=;
                                    if (result.results[result.results.length - 1].final) {
                                        transcript = result.results[result.results.length - 1].alternatives[0].transcript;
                                    }
                                }
                                if (name == "Speaker_Labels:") {
                                    speaker = result.speaker_labels[result.speaker_labels.length - 1].speaker;
                                    var spkr = speaker;
                                    if (transcript != oldTrans) {
                                        trs += " " + transcript;
                                        // process.emit('watson', {
                                        // 	trans: transcript,
                                        // 	user: socket,
                                        // 	patient:req.body.patient_id
                                        // })
                                        Transcript_dataObj = new Transcript_data({
                                            transcript_id: resp._id,
                                            transcript: {
                                                speaker: spkr,
                                                transcript: transcript
                                            }
                                        });
                                        Transcript_dataObj.save(function(err1, tdRes) {
                                            if (err1) {
                                                console.log(err);
                                            } else {
                                                if (tdRes) {
                                                    //console.log("nlunlunlunlunlunlunlul==>",spkr)
                                                    if (spkr != 0) {
                                                        // res.status(200).json({success: true, message: "Successfully uploaded", data: result});
                                                        // parameter => tra, socket, transciption_id
                                                        // recommendation.fetchAll(trs, socket,resp._id,req.body.patient_id);
                                                        //console.log("nlunlunlunlunlunlunlul22")
                                                    }
                                                }
                                            }
                                        })
                                    }

                                    //transcript="";
                                    oldTrans = transcript;
                                    speaker = 0;
                                }

                                //console.log('===****===\n\n',Utils.inspect(datatToSend,false,null),'\n\n===****===');
                            }; //oneve
                        } //if
                    }
                });*/
                res.status(200).json({
                    success: true,
                    message: "Recording has been successfully uploaded",
                    data: result
                });
            }
        })

    });
}

exports.fetchAudio = function (req, res) {
    Interview.findById(req.params.interview, function (err, result) {
        if (err) {
            return res.status(400).json({success: false, message: "Error"});
        }
        return res.status(200).json({success: true, data: result});
    })
}

exports.uploadFile = function (req, res, next) {
    var file_path;
    var mime_type;
    var transcript_duration;
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads')
        },
        filename: function (req, file, callback) {
            mime_type = file.mimetype;
            console.log("mime_type", mime_type);
            var file_name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
            console.log("filename", file_name);
            file_path = path.resolve(__dirname + "/../uploads/" + file_name);
            callback(null, file_name)
        }
    })
    var upload = multer({
        storage: storage
    }).single('file')
    upload(req, res, function (err) {
        if (mime_type === 'audio/flac' || mime_type === 'audio/ogg' || mime_type === 'video/webm') {
            mp3Duration(file_path, function (err, duration) {
                if (err) return console.log(err.message);
                transcript_duration = duration;
                console.log("transcript_duration1", transcript_duration)
                res.status(200).jsonp({
                    "msg": "success",
                    "duration": duration
                });

            });
        } else {
            mm.parseFile(file_path, {duration: true})
                .then(function (metadata) {
                    transcript_duration = metadata.format.duration;
                    console.log("transcript_duration2", transcript_duration)
                    res.status(200).jsonp({
                        "msg": "success",
                        "duration": metadata.format.duration
                    });
                })
                .catch(function (err) {
                    console.error(err.message);
                });
        }


        //saving each transcription as a saperate document

        var transObj = new Transcript({
            user_id: req.user._id,
            patient_id: req.body.patient_id,
            transcript_duration: transcript_duration
        });
        transObj.save(function (err, resp) {
            setTimeout(function () {
                Transcript.update({_id: resp._id}, {$set: {transcript_duration: transcript_duration}}).exec(function (error1, update) {
                    if (!err) {
                        console.log("update", update);
                    }
                })
            }, 3000)
            process.emit("transcriptionId", {user: req.user.socketId, transcriptionId: resp._id})
            if (err) {
                console.log(err);
            } else {
                if (resp) {
                    var params = {
                        'model': 'en-US_NarrowbandModel',
                        'content_type': req.file.mimetype,
                        'interim_results': true,
                        'max_alternatives': 1,
                        'word_confidence': false,
                        'speakerLabels': true,
                        'formattedMessages': [],
                        'timestamps': false,
                        'speaker_labels': true,
                        'keywords': ['colorado', 'tornado', 'tornadoes'],
                        'keywords_threshold': 0.5
                    };

                    jwt.verify(req.params.userId, encKey, function (err, decoded) {
                        if (!err) {
                            User.findOne({
                                _id: decoded["_doc"]._id
                            }).exec(function (err, user) {
                                if (!err) {

                                }
                            })
                        }
                    });

                    // Create the stream.
                    var recognizeStream = speech_to_text.createRecognizeStream(params);
                    // Pipe in the audio.
                    fs.createReadStream(req.file.path).pipe(recognizeStream);
                    // Get strings instead of buffers from 'data' events.
                    recognizeStream.setEncoding('utf8');
                    // Listen for events.
                    recognizeStream.on('results', function (event) {
                        onEvent('Results:', event, req.user.socketId);
                    });
                    recognizeStream.on('data', function (event) {
                        onEvent('Data:', event, req.user.socketId);
                    });
                    recognizeStream.on('error', function (event) {
                        onEvent('Error:', event, req.user.socketId);
                    });
                    recognizeStream.on('close', function (event) {
                        onEvent('Close:', event, req.user.socketId);
                    });
                    recognizeStream.on('speaker_labels', function (event) {
                        onEvent('Speaker_Labels:', event, req.user.socketId);
                    });


                    var speaker = 0;
                    var transcript = "";
                    var oldTrans = "";
                    var toneCount = 1;
                    var oldTone = {};
                    var trs = "";
                    var trans = [];
                    var lastSp = 0;
                    var lastIndex = 0;
                    var speakers = [],
                        lastCnt = 0;
                    var results = [];

                    function onEvent(name, event, socket) {
                        var translation = [];
                        //console.log('===****===\n\n',Utils.inspect(event,false,null),'\n\n===****===');
                        var result = JSON.parse(JSON.stringify(event));
                        if (result.results) {
                            results = result.results
                        }

                        if (result.speaker_labels) {
                            //if (event.speaker_labels.length == this.results[0].alternatives[0].timestamps.length && event.speaker_labels.length != this.lastCnt){
                            for (let k = 0; k < results.length; k++) {
                                if (results[k].alternatives[0].timestamps) {
                                    for (let i = 0; i < result.speaker_labels.length; i++) {
                                        for (let j = 0; j < results[k].alternatives[0].timestamps.length; j++) {
                                            if (results[k].alternatives[0].timestamps[j][1] == event.speaker_labels[i].from) {
                                                //console.log(this.results[k].alternatives[0])
                                                //console.log(this.results[k].alternatives[0].timestamps[j])
                                                trans.push({
                                                    'speaker': event.speaker_labels[i].speaker,
                                                    'transcript': results[k].alternatives[0].timestamps[j][0]
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                            for (var i = 0; i < trans.length; i++) {
                                if (translation.length == 0 || lastSp != trans[i].speaker) {
                                    translation.push({"speaker": trans[i].speaker, "transcript": trans[i].transcript})
                                } else {
                                    translation[translation.length - 1].transcript += " " + trans[i].transcript;
                                }
                                lastSp = trans[i].speaker;
                            }
                            process.emit('watson', {
                                trans: translation,
                                user: socket,
                                patient: req.body.patient_id
                            });
                        }
                        if (name == "Results:") {
                            //var result=;
                            if (result.results[result.results.length - 1].final) {
                                transcript = result.results[result.results.length - 1].alternatives[0].transcript;
                            }
                        }
                        if (name == "Speaker_Labels:") {
                            speaker = result.speaker_labels[result.speaker_labels.length - 1].speaker;
                            var spkr = speaker;
                            if (transcript != oldTrans) {
                                trs += " " + transcript;
                                process.emit('watson', {
                                    trans: transcript,
                                    user: socket,
                                    patient: req.body.patient_id
                                })
                                Transcript_dataObj = new Transcript_data({
                                    transcript_id: resp._id,
                                    transcript: {
                                        speaker: spkr,
                                        transcript: transcript
                                    }
                                });
                                Transcript_dataObj.save(function (err1, tdRes) {
                                    if (err1) {
                                        console.log(err);
                                    } else {
                                        if (tdRes) {
                                            //console.log("nlunlunlunlunlunlunlul==>",spkr)
                                            if (spkr != 0) {
                                                // parameter => tra, socket, transciption_id
                                                recommendation.fetchAll(trs, socket, resp._id, req.body.patient_id);
                                                //console.log("nlunlunlunlunlunlunlul22")
                                                nlu.analyze({
                                                    "features": {
                                                        "sentiment": {}
                                                    },
                                                    "text": trs
                                                }, function (err, data) {
                                                    if (!err) {
                                                        process.emit('sentiment', {
                                                            senti: data.sentiment,
                                                            user: socket,
                                                            patient: req.body.patient_id
                                                        });
                                                        Transcript_data.findOne({
                                                            _id: tdRes._id,
                                                            transcript_id: resp._id
                                                        }).exec(function (error, nluUpdate) {
                                                            if (!error) {
                                                                nluUpdate.transcript.nlu = data.sentiment;
                                                                nluUpdate.save(function (errrr, respp) {
                                                                    //console.log('asdf',respp);
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                                toneAnalyzer.tone({
                                                    text: transcript
                                                }, function (err, data) {
                                                    if (err) {
                                                        return next(err);
                                                    }
                                                    if (oldTone.length) {
                                                        for (var i = 0; i < oldTone.length; i++) {
                                                            oldTone[i].score = oldTone[i].score * toneCount;
                                                            oldTone[i].score += data.document_tone.tone_categories[0].tones[i].score;
                                                            oldTone[i].score /= (toneCount + 1)
                                                        }
                                                        process.emit('tone', {
                                                            tone: oldTone,
                                                            user: socket,
                                                            patient: req.body.patient_id
                                                        });
                                                        //console.log("trans",transcript,"==","tone",oldTone);
                                                        //Transcript_data.update({_id : tdRes._id, transcript_id : resp._id },{ $set: { tone : oldTone }}).exec(function(error,nluUpdate){})
                                                        Transcript_data.findOne({
                                                            _id: tdRes._id,
                                                            transcript_id: resp._id
                                                        }).exec(function (error, nluUpdate) {
                                                            if (!error) {
                                                                nluUpdate.transcript.tone = oldTone
                                                                nluUpdate.save(function (errrr, respp) {
                                                                    //console.log('asdf',respp);
                                                                })
                                                            }
                                                        })
                                                    } else {
                                                        process.emit('tone', {
                                                            tone: data.document_tone.tone_categories[0].tones,
                                                            user: socket,
                                                            patient: req.body.patient_id
                                                        })
                                                        //console.log("trans2==>",transcript,"==","tone2==>",data.document_tone.tone_categories[0].tones);
                                                        Transcript_data.findOne({
                                                            _id: tdRes._id,
                                                            transcript_id: resp._id
                                                        }).exec(function (error, nluUpdate) {
                                                            if (!error) {
                                                                nluUpdate.transcript.tone = data.document_tone.tone_categories[0].tones
                                                                nluUpdate.save(function (errrr, respp) {
                                                                    //console.log('asdf',respp);
                                                                })
                                                            }
                                                        })
                                                        oldTone = data.document_tone.tone_categories[0].tones;
                                                    }
                                                    toneCount++;
                                                });
                                            }
                                        }
                                    }
                                })
                            }

                            //transcript="";
                            oldTrans = transcript;
                            speaker = 0;
                        }

                        //console.log('===****===\n\n',Utils.inspect(datatToSend,false,null),'\n\n===****===');
                    }; //oneve
                } //if
            }
        }); //
    })

    /*Recommendation.find({type:req.params.type}).exec(function(err,recommendations){
    if(err){
    res.status(404).jsonp({"msg":err});
    }else if(recommendations){
    res.status(200).jsonp({"data":recommendations,"msg":""});
    }else{
    res.status(404).jsonp({"msg":(req.params.type==1?"Recommendations":"Danger Harms")+" not found"});
    }
    });*/
}

exports.fetchLiveRecordingData = function (req, res, next) {
    var trs = "";
    var transcript = "";

    res.status(200).jsonp({"msg": "success"})
    if (req.body.speakers) {
        var speaker = req.body.speakers;
        //process.emit('watson',{speaker:speaker,transcript:transcript})
        var speaker0 = req.body.speakers[0].speaker;
        for (var i = 0; i < req.body.speakers.length; i++) {
            if (req.body.speakers[i].speaker != speaker0) {
                transcript = req.body.speakers[i].transcript;
                trs += " " + req.body.speakers[i].transcript;
            }
        }
    } else {
        trs = req.body.trs;
        transcript = req.body.transcript;
    }
    if (req.params.type) {
        if (req.body.speakers) {
            process.emit("watson", {trans: req.body.speakers, user: req.user.socketId, patient: req.patient})
        } else {
            process.emit("watson", {
                trans: {speaker: req.body.speaker, transcript: req.body.transcript},
                user: req.user.socketId,
                patient: req.patient
            })
        }
    }
    if (req.body.speakers) {
        var count = 0;
        var speakers = req.body.speakers;

        function addTrans(speakers, count) {
            //process.emit("watson",{trans:{speaker:req.body.speaker,transcript:req.body.transcript},user:req.user.socketId})
            Transcript_dataObj = new Transcript_data({
                transcript_id: req.params.transcriptionsId,
                transcript: {
                    speaker: speakers[count].speaker,
                    transcript: speakers[count].transcript
                }
            });
            Transcript_dataObj.save(function (err1, tdRes) {
                if (err1) {
                    console.log(err1);
                } else {
                    if (tdRes) {
                        nlu.analyze({
                            "features": {"sentiment": {}},
                            "text": speakers[count].trs,
                            language: 'en'
                        }, function (err, data) {
                            if (!err) {
                                //process.emit('sentiment',{senti:data.sentiment,user:req.user.socketId});
                                Transcript_data.findOne({
                                    _id: tdRes._id,
                                    transcript_id: req.params.transcriptionsId
                                }).exec(function (error, nluUpdate) {
                                    if (!error) {
                                        nluUpdate.transcript.nlu = data.sentiment;
                                        nluUpdate.save(function (errrr, respp) {
                                            toneAnalyzer.tone({text: speakers[count].transcript}, function (err, data) {
                                                var toneCount = 1;
                                                if (err) {
                                                    return next(err);
                                                }
                                                if (oldTone.length) {
                                                    for (var i = 0; i < oldTone.length; i++) {
                                                        oldTone[i].score = oldTone[i].score * toneCount;
                                                        oldTone[i].score += data.document_tone.tone_categories[0].tones[i].score;
                                                        oldTone[i].score /= (toneCount + 1)
                                                    }
                                                    //process.emit('tone',{tone:oldTone,user:req.user.socketId});
                                                    Transcript_data.findOne({
                                                        _id: tdRes._id,
                                                        transcript_id: req.params.transcriptionsId
                                                    }).exec(function (error, nluUpdate) {
                                                        if (!error) {
                                                            nluUpdate.transcript.tone = oldTone
                                                            nluUpdate.save(function (errrr, respp) {
                                                                //console.log('asdf',respp);
                                                                count = count + 1;
                                                                if (speakers.length === count) {
                                                                } else {
                                                                    addTrans(speakers, count++)
                                                                }

                                                            })
                                                        }
                                                    })
                                                } else {
                                                    //process.emit('tone',{tone:data.document_tone.tone_categories[0].tones,user:req.user.socketId})
                                                    oldTone = data.document_tone.tone_categories[0].tones;
                                                    Transcript_data.findOne({
                                                        _id: tdRes._id,
                                                        transcript_id: req.params.transcriptionsId
                                                    }).exec(function (error, nluUpdate) {
                                                        if (!error) {
                                                            nluUpdate.transcript.tone = data.document_tone.tone_categories[0].tones
                                                            nluUpdate.save(function (errrr, respp) {
                                                                //console.log('asdf',respp);
                                                                count = count + 1;
                                                                if (speakers.length === count) {
                                                                } else {
                                                                    addTrans(speakers, count++)
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                                toneCount++;
                                            });
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })

        }

        addTrans(speakers, count);
    } else {
        //process.emit("watson",{trans:{speaker:req.body.speaker,transcript:req.body.transcript},user:req.user.socketId})
        Transcript_dataObj = new Transcript_data({
            transcript_id: req.params.transcriptionsId,
            transcript: {
                speaker: req.body.speaker,
                transcript: req.body.transcript
            }
        });
        Transcript_dataObj.save(function (err1, tdRes) {
            if (err1) {
                console.log(err);
            } else {
                if (tdRes) {
                    nlu.analyze({"features": {"sentiment": {}}, "text": trs}, function (err, data) {
                        if (!err) {
                            //process.emit('sentiment',{senti:data.sentiment,user:req.user.socketId});
                            Transcript_data.findOne({
                                _id: tdRes._id,
                                transcript_id: req.params.transcriptionsId
                            }).exec(function (error, nluUpdate) {
                                if (!error) {
                                    nluUpdate.transcript.nlu = data.sentiment;
                                    nluUpdate.save(function (errrr, respp) {
                                        //console.log('asdf',respp);
                                    })
                                }
                            })
                        }
                    })
                    toneAnalyzer.tone({text: transcript}, function (err, data) {
                        var toneCount = 1;
                        if (err) {
                            return next(err);
                        }
                        if (oldTone.length) {
                            for (var i = 0; i < oldTone.length; i++) {
                                oldTone[i].score = oldTone[i].score * toneCount;
                                oldTone[i].score += data.document_tone.tone_categories[0].tones[i].score;
                                oldTone[i].score /= (toneCount + 1)
                            }
                            //process.emit('tone',{tone:oldTone,user:req.user.socketId});
                            Transcript_data.findOne({
                                _id: tdRes._id,
                                transcript_id: req.params.transcriptionsId
                            }).exec(function (error, nluUpdate) {
                                if (!error) {
                                    nluUpdate.transcript.tone = oldTone
                                    nluUpdate.save(function (errrr, respp) {
                                        //console.log('asdf',respp);
                                    })
                                }
                            })
                        } else {
                            //process.emit('tone',{tone:data.document_tone.tone_categories[0].tones,user:req.user.socketId})
                            oldTone = data.document_tone.tone_categories[0].tones;
                            Transcript_data.findOne({
                                _id: tdRes._id,
                                transcript_id: req.params.transcriptionsId
                            }).exec(function (error, nluUpdate) {
                                if (!error) {
                                    nluUpdate.transcript.tone = data.document_tone.tone_categories[0].tones
                                    nluUpdate.save(function (errrr, respp) {
                                        //console.log('asdf',respp);
                                    })
                                }
                            })
                        }
                        toneCount++;
                    });
                }
            }
        })
    }
    // tra, socket, transciption_id,userId, patientId
    // recommendation.fetchAll(trs, socket,req.params.transcriptionsId);
    if (trs) {
        recommendation.fetchAll(trs, req.user.socketId, req.params.transcriptionsId, req.patient);
    }

    var oldTone = {};
    if (trs) {
        nlu.analyze({"features": {"sentiment": {}}, "text": trs}, function (err, data) {
            if (!err) {
                process.emit('sentiment', {senti: data.sentiment, user: req.user.socketId, patient: req.patient});
            }
        })
    }

    if (transcript) {
        toneAnalyzer.tone({text: transcript}, function (error, data) {
            var toneCount = 1;
            if (error) {
                //return next(error);
            }
            if (oldTone.length) {
                for (var i = 0; i < oldTone.length; i++) {
                    oldTone[i].score = oldTone[i].score * toneCount;
                    oldTone[i].score += data.document_tone.tone_categories[0].tones[i].score;
                    oldTone[i].score /= (toneCount + 1)
                }
                process.emit('tone', {tone: oldTone, user: req.user.socketId, patient: req.patient});
            } else {
                process.emit('tone', {
                    tone: data.document_tone.tone_categories[0].tones,
                    user: req.user.socketId,
                    patient: req.patient
                })
                oldTone = data.document_tone.tone_categories[0].tones;
            }
            toneCount++;
        });
    }
}


exports.saveDuration = function (req, res) {
    Transcript.findOne({_id: req.params.transcript}).exec(function (err, transcript) {
        if (!err) {
            transcript.transcript_duration = req.params.duration;
            transcript.save(function (err) {
                if (!err) {
                    res.status(200).jsonp({msg: "success"});
                }
            });
        }
    })
}

exports.getTranscript = function (req, res) {
    Transcript.findOne({_id: req.params.transcript}).populate('user_id', 'name email image').populate('patient_id').exec(function (err, transcript) {
        if (!err) {
            if (transcript) {
                res.status(200).jsonp({data: transcript});
            } else {
                res.status(404).jsonp({msg: "Transcript not found"})
            }
        }
    })
}