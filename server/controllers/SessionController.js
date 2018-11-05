require('../config/config');
const Session = require('../models/Session');

class SessionController {


    updateSession(req, res) {

      if (req.session.userID) {

        let userID = '' + req.session.userID;
        
        let body = {

          userID,
          userSession: req.sessionID

        }

        Session.findOneAndUpdate({userID}, body, (err, session) => {

          if (err) {
    
            console.log(err);
      
          }

          if (!session) {

            let session = new Session(body);

            session.save((err, session) => {

              if (err) {
    
                console.log(err);
          
              }

            });

          }

        });

      }
    
    }

    verifySession(req, res) {

      let userID = req.user._id;
      let cookie = req.headers.cookie;
      let cookieValue = this.parseCookie(cookie);
    
      Session.findOne({userID}, (err, session) => {
    
        if (err) {
    
          return res.status(500).json({
    
            ok: false,
            err
          
          });
    
        }
    
        if (!session) {
    
          return res.status(401).json({
    
            ok: false,
            message: 'Session verification failed'
          
          });
    
        }
    
        if (session.userSession === cookieValue) {

          res.json({
    
            ok: true,
            message: 'Session verified successfully'
    
          });
    
        } else {

          res.status(401).json({

            ok: false,
            message: 'Session verification failed'
  
          });

        }
    
      });

    }

    //Cookie Parser made by Javier
    parseCookie(cookie) {

      var decodedCookie = decodeURIComponent(cookie);

      var cookieValue = decodedCookie.split('connect.sid=s:');

      var cookieSession = cookieValue[1].split('.');
      
      return cookieSession[0];

    }

}

var sessionController = new SessionController();

module.exports = sessionController;