import express from "express";
import cors from "cors";
import { pool } from "./db";
import { ApiResponse  } from "./api_response";'./api_response';

const app = express();
app.use(cors());
app.use(express.json());

app
  .route("/api/reply")
  .get(async (req, res) => {
    try {
      let replies = await pool.query("SELECT * FROM replies");
      res.json(
        new ApiResponse("ok", "Records retrieved successfully", replies.rows)
      );
    } catch (error) {
      res.status(500);
      res.json(new ApiResponse("error", (error as any).message, null));
      console.log(error);
    }
  })

  .post(async (req, res) => {
    try {
      const text = req.body.text;
      if (text == null || text == undefined) {
        res.status(400);
        res.json(new ApiResponse("error", "Bad Request", null));
        return;
      }
      let reply = await (
        await pool.query("INSERT INTO replies (text) VALUES ($1) RETURNING *", [
          text,
        ])
      ).rows[0];
      res.json(new ApiResponse("ok", "Inserted successfully", reply));
    } catch (error) {
      res.status(500);
      res.json(new ApiResponse("error", (error as any).message, null));
      console.log(error);
    }
  })

  .delete(async (req, res) => {
    try {
      let replies = await pool.query("DELETE FROM replies RETURNING *");
      res.json(
        new ApiResponse("ok", replies.rowCount + " records deleted", null)
      );
    } catch (error) {
      res.status(500);
      res.json(new ApiResponse("error", (error as any).message, null));
      console.log(error);
    }
  });

app
  .route("/api/reply/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      if (id == null || id == undefined) {
        res.status(400);
        res.json(new ApiResponse("error", "Bad Request", null));
        return;
      }
      const reply = await pool.query("SELECT * FROM replies WHERE id = $1", [
        id,
      ]);
      res.json(new ApiResponse("ok", "Record retrieved successfully", reply));
    } catch (error) {
      res.status(500);
      res.json(new ApiResponse("error", (error as any).message, null));
      console.log(error);
    }
  })

  .put(async (req, res) => {
    try {
      const id = req.params.id;
      const text = req.body.text;
      if (id == null || id == undefined || text == null || text == undefined) {
        res.status(400);
        res.json(new ApiResponse("error", "Bad Request", null));
        return;
      }
      let reply = await pool.query(
        "UPDATE replies SET text = $1 WHERE id = $2",
        [text, id]
      );
      res.json(new ApiResponse("ok", "Record updated successfully", reply));
    } catch (error) {
      res.status(500);
      res.json(new ApiResponse("error", (error as any).message, null));
      console.log(error);
    }
  })

  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      if (id == null || id == undefined) {
        res.status(400);
        res.json({ message: "Bad Request" });
        return;
      }
      const reply = await pool.query(
        "DELETE FROM replies WHERE id = $1 RETURNING *",
        [id]
      );
      res.json({ message: reply.rows[0] });
    } catch (error) {
      res.status(500);
      res.json(new ApiResponse("error", (error as any).message, null));
      console.log(error);
    }
  });

app
  .route("/api/account")
  .get(async (req, res) => {
    try {
      let accounts = await pool.query("SELECT * FROM accounts");
      res.json(new ApiResponse("ok", "", accounts.rows));
    } catch (error) {
      res.status(500);
      res.json(new ApiResponse("error", (error as any).message, null));
      console.log(error);
    }
  })

  .post(async (req, res) => {
    try {
      let username = req.body.username;
      let password = req.body.password;
      if (
        username == null ||
        username == undefined ||
        password == null ||
        password == undefined
      ) {
        res.status(400);
        res.json(new ApiResponse("error", "Bad Request", null));
        return;
      }
      let account = await pool.query(
        "INSERT INTO accounts (username, password) VALUES ($1, $2) RETURNING *",
        [username, password]
      );
      res.json(new ApiResponse("ok", "", account.rows[0]));
    } catch (error) {
      res.status(500);
      res.json(new ApiResponse("error", (error as any).message, null));
      console.log(error);
    }
  })

  .delete(async (req, res) => {
    try {
      let accounts = await pool.query("DELETE FROM accounts RETURNING *");
      res.json(
        new ApiResponse("ok", accounts.rowCount + " Records deleted", null)
      );
    } catch (error) {
      res.status(500);
      res.json(new ApiResponse("error", (error as any).message, null));
      console.log(error);
    }
  });

  app.route("/api/account/:id")
  .put(async (req, res) => {
      try {
        let id = req.params.id;
        let username = req.body.username;
        let password = req.body.password;
          let accounts = await pool.query("UPDATE accounts SET username = $1, password = $2 WHERE id = $3", [username, password, id]);
          res.json(new ApiResponse("ok", "Record updated successfully", accounts.rows[0]));
      } catch (error) {
        res.status(500);
        res.json(new ApiResponse("error", (error as any).message, null));
        console.log(error);
      }
  })

  .delete(async (req, res) => {
      try {
          let id = req.params.id;
          let accounts = await pool.query("DELETE FROM accounts WHERE id = $1", [id])
          res.json(new ApiResponse("ok", accounts.rowCount+" Records deleted", null));
      } catch (error) {
        res.status(500);
        res.json(new ApiResponse("error", (error as any).message, null));
        console.log(error);
      }
  })

app.listen(8080, () => console.log("http://localhost:8080"));
