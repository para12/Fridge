import { PrismaClient } from "@prisma/client";
import { sendSecretMail } from "../mailer";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    allFoods: async (_, __, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const allFoods = await prisma.food.findMany({
        where: { fridgeID: req.user.fridgeID },
      });
      return allFoods;
    },
    userlist: async (_, __, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const userlist = await prisma.user.findMany({
        where: { fridgeID: req.user.fridgeID },
      });
      return userlist;
    },
  },
  Mutation: {
    addFood: async (
      _,
      { id, name, quantity, shelf, date },
      { req, isAuthenticated }
    ) => {
      isAuthenticated(req);
      const newFood = await prisma.food.create({
        data: {
          id,
          name,
          quantity,
          shelf,
          date,
          fridge: {
            connect: {
              id: req.user.fridgeID,
            },
          },
        },
      });
      return newFood;
    },
    deleteFood: async (_, { id }, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const deletedFood = await prisma.food.delete({
        where: { id },
      });
      return deletedFood;
    },
    updateQuantity: async (_, { id, quantity }, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const quantityUpdateFood = await prisma.food.update({
        data: { quantity },
        where: { id },
      });
      return quantityUpdateFood;
    },
    confirmSecret: async (_, { email, secret }) => {
      const user = await prisma.user.findOne({ where: { email } });
      if (user.loginSecret === secret) {
        if (!user.fridgeID) {
          const tempId = uuidv4();
          await prisma.fridge.create({
            data: {
              id: tempId,
              name: "other",
            },
          });
          await prisma.user.update({
            where: { id: user.id },
            data: {
              loginSecret: "",
              fridge: {
                connect: {
                  id: tempId,
                },
              },
            },
          });
        }
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        // return jwt.sign({ id: user.id }, "secret");
      } else {
        throw Error("Wrong email/secrect combination");
      }
    },
    createAccount: async (_, { email }) => {
      const exist = await prisma.user.count({ where: { email } });
      if (exist) {
        return false;
      }
      const loginSecret = String(Math.floor(Math.random() * 10000));
      await sendSecretMail(email, loginSecret);
      await prisma.user.create({
        data: { id: uuidv4(), email, loginSecret },
      });
      return true;
    },
    // createAccount: async (_, { email }) => {
    //   const exist = await prisma.user.count({ where: { email } });
    //   const existWithoutFridge = await prisma.user.count({
    //     where: {
    //       AND: [
    //         {
    //           email,
    //         },
    //         {
    //           fridgeID: null,
    //         },
    //       ],
    //     },
    //   });
    //   if (existWithoutFridge) {
    //     return true;
    //   } else if (exist) {
    //     throw Error("This email is already taken");
    //   } else {
    //     const loginSecret = String(Math.floor(Math.random() * 10000));
    //     await prisma.user.create({
    //       data: { id: uuidv4(), email, loginSecret },
    //     });
    //     await sendSecretMail(email, loginSecret);
    //     return true;
    //   }
    // },
    requestSecret: async (_, { email }) => {
      try {
        const exist = await prisma.user.count({ where: { email } });
        if (!exist) {
          return false;
        }
        const loginSecret = String(Math.floor(Math.random() * 10000));
        await sendSecretMail(email, loginSecret);
        await prisma.user.update({ data: { loginSecret }, where: { email } });
        return true;
      } catch (e) {
        Throw(e);
      }
    },
    shareFridge: async (_, { email }, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const userToBeShared = await prisma.user.findOne({ where: { email } });
      if (!userToBeShared) {
        return false;
      }
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          fridge: {
            connect: {
              id: req.user.fridgeID,
            },
          },
        },
      });
      return true;
    },
  },
};

export default resolvers;
