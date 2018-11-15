require('../config/config');
const Session = require('../models/Session');

class SessionController {


    updateSession(req, res) {

      if (req.session.userID) {

        const userID = '' + req.session.userID;
        
        const body = {

          userID,
          userSession: req.sessionID

        }

        Session.findOneAndUpdate({userID}, body, (err, session) => {

          if (err) {
    
            console.log(err);
      
          }

          if (!session) {

            const session = new Session(body);

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

      const userID = req.user._id;
      const cookie = req.headers.cookie;
      const cookieValue = this.parseCookie(cookie);
    
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

      const decodedCookie = decodeURIComponent(cookie);

      const cookieValue = decodedCookie.split('connect.sid=s:');

      const cookieSession = cookieValue[1].split('.');
      
      return cookieSession[0];

    }

}

const sessionController = new SessionController();

module.exports = sessionController;