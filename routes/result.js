const express = require("express");

const report = require("../models/report");
const router = express.Router();
const json2csv = require("json2csv").parse;
var path = require("path");
const fs = require("fs");

var output;

router.get("/api/result/:name", async (req, res, next) => {
    try {
        const dateTime = new Date()
            .toISOString()
            .slice(-24)
            .replace(/\D/g, "")
            .slice(0, 14);

        const filePath = path.join(__dirname, "./", "csv-" + dateTime + ".csv");

        let csv;
        output = await report
            .findOne({
                name: req.params.name
            })
            .select("name -_id fontsused fontsizes characters lines sections date");

        const fields = [
            "name",
            "lines",
            "characters",
            "fontsused",
            "fontsizes",
            "date",
            "section"
        ];

        try {
            csv = json2csv(output, {
                fields
            });
        } catch (err) {
            return res.status(500).json({
                err
            });
        }

        fs.writeFile(filePath, csv, function (err) {
            if (err) {
                return res.json(err).status(500);
            } else {
                setTimeout(function () {
                    fs.unlink(filePath, function (err) {
                        // delete this file after 30 seconds
                        if (err) {
                            console.error(err);
                        }
                        console.log("File has been Deleted");
                    });
                }, 30000);
                res.download(filePath);
            }
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;