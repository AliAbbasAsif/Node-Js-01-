const SignupModal = require("../models/Signup");
const bcrypt = require("bcryptjs");
const CredentialController = {
  Login: (request, response) => {
    console.log(request.body, "request.body");
    const { email, password } = request.body;
    if ((!email, !password)) {
      response.json({
        message: "Requires fields are missing",
        status: false,
      });
      return;
    }
    SignupModal.findOne({ email: email }, (error, user) => {
      if (error) {
        response.json({
          message: "internal error",
          status: false,
        });
        return;
      } else {
        if (!user) {
          response.json({
            message: "Credential error",
            status: false,
          });
          return;
        } else {
          console.log("User", user);
          const comparepassword = bcrypt.compareSync(password, user.password);
          console.log(comparepassword, "comparepassword");
          if (comparepassword) {
            response.json({
              message: "User successfully login",
              status: true,
              user,
            });
          } else {
            response.json({
              message: "Credential error",
              status: false,
            });
          }
        }
      }
    });
  },
  Signup: (request, response) => {
    const { firstname, lastname, Email, Password, mobilenumber, dob } =
      request.body;

    if (
      !firstname ||
      !lastname ||
      !Email ||
      !Password ||
      !mobilenumber ||
      !dob
    ) {
      response.json({
        message: "Requires fields are missing",
        status: false,
      });
      return;
    }

    const Hashpassword = bcrypt.hashSync(Password, 10);
    console.log(Hashpassword, "HashPassword");
    const objtoSend = {
      first_name: firstname,
      last_name: lastname,
      email: Email,
      password: Hashpassword,
      dob: dob,
      mobile_number: mobilenumber,
    };

    SignupModal.findOne({ email: Email }, (error, user) => {
      console.log(request.body);
      if (error) {
        response.json({
          message: "DB Error",
          status: false,
        });
      } else {
        console.log(user, "User");
        if (user) {
          response.json({
            message: "Email address already exits",
            status: false,
          });
        } else {
          SignupModal.create(objtoSend, (error, user) => {
            if (error) {
              response.json({
                message: `Internal error ${error}`,
                status: false,
              });
            } else {
              response.json({
                message: "Data successfully added",
                user: user,
                status: true,
              });
            }
          });
        }
      }
    });
  },
};

module.exports = CredentialController;
