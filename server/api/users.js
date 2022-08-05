const router = require("express").Router();
const {
   models: { User, Order, LineItem },
} = require("../db");
const { isLoggedIn, isAdmin } = require("./protection");

router.get("/", isLoggedIn, isAdmin, async (req, res, next) => {
   try {
      const users = await User.findAll({
         // explicitly select only the id and username fields - even though
         // users' passwords are encrypted, it won't help if we just
         // send everything to anyone who asks!
         attributes: ["id", "email", "isAdmin"],
      });
      res.json(users);
   } catch (err) {
      next(err);
   }
});

router.post("/", async (req, res, next) => {
   try {
      const user = await User.create(req.body);
      res.send(user);
   } catch (err) {
      next(err);
   }
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
   try {
      // add conditional; second conditional req.user.isAdmin
      let paramsId = +req.params.id;
      let admin, user;
      if (paramsId === req.user.id) {
         if (req.user.isAdmin) {
            admin = await User.findByPk(paramsId);
            res.json(admin);
         } else {
            user = await User.findByPk(paramsId);
            res.json(user);
         }
      } else {
         res.sendStatus(401);
      }
   } catch (err) {
      next(err);
   }
});

router.put("/:id", isLoggedIn, async (req, res, next) => {
   try {
      // conditional req.req.user.id || req.user.isAdmin
      let paramsId = +req.params.id;
      let admin, user;
      if (paramsId === req.user.id) {
         if (req.user.isAdmin) {
            admin = await User.findByPk(paramsId);;
            res.send(await admin.update(req.body));
         } else {
          user = await User.findByPk(paramsId);;
          res.send(await user.update(req.body));
         }
      } else {
        res.sendStatus(401);
      }
   } catch (err) {
      next(err);
   }
});

router.delete("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
   try {
      let paramsId = +req.params.id;
      let admin, user;
      if (paramsId === req.user.id) {
        if (req.user.isAdmin) {
           admin = await User.findByPk(paramsId);
           await admin.destroy();
           res.send( admin);
        } else {
          user = await User.findByPk(paramsId);
          await user.destroy();
          res.send( user);
        }
     } else {
       res.sendStatus(401);
     }
   } catch (err) {
      next(err);
   }
});

module.exports = router;
