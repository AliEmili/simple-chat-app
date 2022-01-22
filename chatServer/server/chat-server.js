const WebSocket = require("ws");
let models = require("./server.js").models;

const ws = new WebSocket.Server({ port: 8080 });

ws.on("connection", (ws) => {
  function login(email, password) {
    models.User.login(email, password, (err, result) => {
      if (err) {
        ws.send(
          JSON.stringify({
            type: "ERROR",
            error: err,
          })
        );
      } else {
        models.User.findOne(
          { where: { id: result.userId }, include: "Profile" },
          (err2, user) => {
            if (err2) {
              ws.send(
                JSON.stringify({
                  type: "ERROR",
                  error: err2,
                })
              );
            } else {
              ws.send(
                JSON.stringify({
                  type: "LOGGEDIN",
                  data: {
                    session: result,
                    user: user,
                  },
                })
              );
            }
          }
        );
      }
    });
  }

  ws.on("message", (message) => {
    console.log("got message", JSON.parse(message));
    let parsed = JSON.parse(message);
    if (parsed) {
      switch (parsed.type) {
        case "SIGNUP":
          models.User.create(parsed.data, (err, user) => {
            if (err) {
              ws.send(
                JSON.stringify({
                  type: "ERROR",
                  error: err,
                })
              );
            } else {
              models.Profile.create(
                {
                  userId: user.id,
                  name: parsed.data.name,
                  email: parsed.data.email,
                },
                (profileError, profile) => {
                  if (profileError) {
                  } else {
                  }
                }
              );
            }
          });
        default:
          console.log("nothing to see here");
      }
    }
  });

  console.log("Got message", ws);
});
