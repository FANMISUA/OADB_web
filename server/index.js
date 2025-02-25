const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

const port = process.env.PORT




//middleware
app.use(cors())
app.use(express.json())

//ROUTES

//Create
app.post("/chemicals", async (req, res) => {
    try {
        console.log(req.body)
        const { oadb_chemicalid, cid } = req.body
        const newChemical = await pool.query(
            "INSERT INTO chemical (oadb_chemicalid,cid) values ($1,$2) RETURNING *",
            [oadb_chemicalid, cid])

        res.json(newChemical.rows[0])
    }
    catch (err) {
        console.error(err.message)
    }
})



//get all

//get data in demotable
app.get("/demotable", async (req, res) => {
    try {
        const demotable = await pool.query("select * from demotable")
        res.json(demotable.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get all in chemical
app.get("/chemicals", async (req, res) => {
    try {
        const allChemicals = await pool.query("SELECT * FROM chemical")
        res.json(allChemicals.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a chemical by cname
app.get("/chemicalsname/:cname", async (req, res) => {
    try {
        const { cname } = req.params
        console.log(cname)
        const chemical = await pool.query("SELECT * FROM chemical WHERE lower(cmpdname) LIKE lower($1) or lower(molecularname) LIKE lower($1) or lower(bindingdbligandname) LIKE lower($1)", ['%' + cname + '%'])
        // const chemical = await pool.query("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid and lower(cmpdname) LIKE lower($1) or lower(molecularname) LIKE lower($1) or lower(bindingdbligandname) LIKE lower($1)", ['%' + cname + '%'])

        // console.log("SELECT * FROM chemical WHERE cmpdname LIKE ?",[`%${cname}%`]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a chemical by casno
app.get("/chemicalscasno/:casno", async (req, res) => {
    try {
        const { casno } = req.params
        console.log(casno)
        const chemical = await pool.query("SELECT * FROM chemical WHERE split_part(casno,'|',1) = $1", [casno])
        // console.log("'SELECT * FROM chemical WHERE casno = $1", [`{casno}`])
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get a chemical by weight range
app.get("/chemicalsweight", async (req, res) => {
    try {
        let maxwt = parseFloat(req.query.maxweight)
        let minwt = parseFloat(req.query.minweight)
        console.log(req.query.minweight, req.query.maxweight)
        const chemical = await pool.query("SELECT * FROM chemical WHERE cast(split_part(molecularweight,',',1) as double precision) >=$1 and  cast(split_part(molecularweight,',',1) as double precision) <=$2 ", [minwt, maxwt])
        // console.log("SELECT * FROM chemical WHERE molecularweight >=$1 and molecularweight <=$2 ", [req.query.minweight,req.query.maxweight]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a chemical by alogp
app.get("/chemicalsalogp", async (req, res) => {
    try {
        let maxp = parseFloat(req.query.maxalogp)
        let minp = parseFloat(req.query.minalogp)
        console.log(maxp, minp)
        const chemical = await pool.query("SELECT * FROM chemical WHERE cast(split_part(alogp,',',1) as double precision) >=$1 and cast(split_part(alogp,',',1) as double precision) <=$2 ", [minp, maxp])
        // console.log("SELECT * FROM chemical WHERE cast(alogp as double precision) >=$1 and cast(alogp as double precision) <=$2 ", [minp,maxp]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a chemical by smile in demosdf table
app.get("/demosdf/:smile", async (req, res) => {
    try {
        const { smile } = req.params
        console.log(smile)
        const chemical = await pool.query("SELECT * FROM demosdf WHERE lower(smiles) = lower($1)", [smile])
        // console.log("SELECT * FROM chemical WHERE cmpdname LIKE ?",[`%${cname}%`]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a chemical by cname from all tables
app.get("/mastertableinfo/:cname", async (req, res) => {
    try {
        const { cname } = req.params
        console.log(cname)
        // const chemical = await pool.query("SELECT * FROM chemical WHERE lower(cmpdname) LIKE lower($1) or lower(molecularname) LIKE lower($1) or lower(bindingdbligandname) LIKE lower($1)", ['%' + cname + '%'])
        const chemical = await pool.query("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid and lower(cmpdname) LIKE lower($1) limit 300", ['%' + cname + '%'])

        // console.log("SELECT * FROM chemical WHERE cmpdname LIKE ?",[`%${cname}%`]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a chemical by smiles structure from all tables
app.get("/structurequery/:smile", async (req, res) => {
    try {
        const { smile } = req.params
        console.log(smile)
        // const chemical = await pool.query("SELECT * FROM chemical WHERE lower(cmpdname) LIKE lower($1) or lower(molecularname) LIKE lower($1) or lower(bindingdbligandname) LIKE lower($1)", ['%' + cname + '%'])
        // const chemical = await pool.query("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid and chemical.smiles@ > $1 limit 600", [ smile ])
        const chemical = await pool.query("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid and lower(chemical.smiles) LIKE lower($1) limit 300", ['%' + smile + '%'])

        // console.log("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid and smiles LIKE $1 limit 600",[`%${smile}%`]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get a chemical by casno from all tables
app.get("/casnoquery/:casno", async (req, res) => {
    try {
        const { casno } = req.params
        console.log(casno)
        const chemical = await pool.query("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid and lower(chemical.casno) LIKE lower($1) limit 300", ['%' + casno + '%'])

        // console.log("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid and smiles LIKE $1 limit 600",[`%${casno}%`]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get a chemical by assay name from all tables
app.get("/assaynamequery/:aname", async (req, res) => {
    try {
        const { aname } = req.params
        console.log(aname)
        const chemical = await pool.query("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid and lower(assay.aidname) LIKE lower($1) limit 300", ['%' + aname + '%'])

        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get a chemical by activity value from all tables
app.get("/activitydataquery", async (req, res) => {
    try {
        let maxval = parseFloat(req.query.maxvalue)
        let minval = parseFloat(req.query.minvalue)
        console.log(minval, maxval)
        const chemical = await pool.query("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid and data.value >= $1 and data.value <= $2 limit 300", [minval, maxval])
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})




//get a chemical by weight range from all tables
app.get("/mastertableweight", async (req, res) => {
    try {
        let maxwt = parseFloat(req.query.maxweight)
        let minwt = parseFloat(req.query.minweight)
        console.log(req.query.minweight, req.query.maxweight)
        const chemical = await pool.query("select * from data, chemical, reference, assay where data.for_chemicalid = chemical.oadb_chemicalid and data.for_publicationid = reference.oadb_publicationid and data.for_assayid = assay.oadb_assayid WHERE cast(split_part(molecularweight,',',1) as double precision) >=$1 and  cast(split_part(molecularweight,',',1) as double precision) <=$2 limit 300", [minwt, maxwt])
        // console.log("SELECT * FROM chemical WHERE molecularweight >=$1 and molecularweight <=$2 ", [req.query.minweight,req.query.maxweight]);
        res.json(chemical.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//update

//delete

//init
// app.listen(5000, '0.0.0.0', () => {
//     console.log("server has started on port 5000")
// })
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})