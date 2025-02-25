const Pool = require("pg").Pool

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "aws-0-us-west-1.pooler.supabase.com",
  port: 6543,
  database: "oadb"
})


// const pool = new Pool({
//   user: "oak",
//   password: "oak",
//   host: "10.14.0.40",
//   port: 5432,
//   database: "oadb"
// })


module.exports = pool