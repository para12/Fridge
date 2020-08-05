import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    allFoods: async () => {
      const allFoods = await prisma.food.findMany();
      return allFoods;
    },
  },
  Mutation: {
    addFood: async (_, { id, name, quantity, shelf, date }) => {
      const newFood = await prisma.food.create({
        data: {
          id,
          name,
          quantity,
          shelf,
          date,
        },
      });
      return newFood;
    },
    deleteFood: async (_, { id }) => {
      const deletedFood = await prisma.food.delete({
        where: { id },
      });
      return deletedFood;
    },
    updateQuantity: async (_, { id, quantity }) => {
      const quantityUpdateFood = await prisma.food.update({
        data: { quantity },
        where: { id },
      });
      return quantityUpdateFood;
    },
  },
};

export default resolvers;
