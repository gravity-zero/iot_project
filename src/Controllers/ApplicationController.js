const InfluxDB = require('@influxdata/influxdb-client')
const client = new InfluxDB('http://127.0.0.1:8086/mydb');
const Application = require('../models/ApplicationModel');

exports.modifyApplication = (req, res, next) => {
    Application.findOne({ _id: req.params.id })
        .then(application => {
            const applicationObject = req.body.application;
            Application.updateOne({ _id: req.params.id }, { 
               // ici les champs à update
            })
                .then((application) => res.status(200).json({message : 'Application modifié', application: application}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteApplication = (req, res, next) => {
    Application.findOne({ _id: req.params.id })
        .then(application => {
            if (application !== null) {
                Application.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({message : 'Application supprimé'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                return res.status(404).json({ message: 'Application non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ message: 'application not found :' + error }));
};

exports.getOneApplication = (req, res, next) => {
    Application.findOne({ _id: req.params.id })
        .then(application => res.status(200).json(application))
        .catch(error => res.status(404).json({ message: 'application not found :' + error }));
};

exports.getAllApplications = (req, res, next) => {
    Application.find()
        .then(applications => res.status(200).json(applications))
        .catch(error => res.status(400).json({ error }));
};