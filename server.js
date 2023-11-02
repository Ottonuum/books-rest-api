import express from "express";
import { PrismaClient } from "@prisma/client";

const PORT = 3030;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get ('/books', async (request, response) => {
    try {
    const books = await prisma.books.findMany();
    response.status(200).json(books);
    } catch(error) {
        response.status(404).send({
            message: "Midagi läks valesti",
            error,
        });
    }
});

app.delete('/books/:id', async (request, response) => {
    try {
        const deletedBook = await prisma.books.delete({
            where: {
                id: Number(request.params.id),
            }
        });

        response.status(200).json(deletedBook);
    }catch (error) {
        response.status(404).send({
            message: "Midagi läks valesti",
            error,
        });
    }
});

app.post('/books', async (request, response) => {
    
    try {
        const createdBooks = await prisma.books.create({
            data: { ...request.body }, 
        });
        response.status(200).json(createdBooks);
    } catch (error) {
        response.status(404).send({
            message: "Midagi läks valesti",
            error,
        });
    }
});

app.put('/books/:id', async (request, response) => {

    const { id } = request.params;

    try {
        const updateBooks = await prisma.books.update({
            where: {id: parseInt(id) },
            data: { ... request.body },
        });
        response.status(200).json (updateBooks)

    } catch (error) {
        response.status(404).send({
            message: "Midagi läks valesti",
            error,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

