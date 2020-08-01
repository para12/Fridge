import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    allFoods: async () => {
      const allFoods = await prisma.foods.findMany();
      return allFoods;
    },
  },
  Mutation: {
    addFood: async (_, { id, name, quantity, shelf, date }) => {
      const newFood = await prisma.foods.create({
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
      const deletedFood = await prisma.foods.delete({
        where: { id },
      });
      return deletedFood;
    },
    updateQuantity: async (_, { id, quantity }) => {
      const quantityUpdateFood = await prisma.foods.update({
        data: { quantity },
        where: { id },
      });
      return quantityUpdateFood;
    },
  },
};

export default resolvers;
