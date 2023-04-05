import categoriesRepo from "#lib/accountancy/repositories/categoriesRepo.js";

async function getCategories(req, reply) {

    const categories = await categoriesRepo.getAll();
    return reply.status(200).send(categories);
}

async function updateCategory(req, reply) {
    const { categoryId } = req.params;
    const updated = req.body;
    const category = await categoriesRepo.update(categoryId, updated);
    return reply.status(200).send(category);
}

async function deleteCategory(req, reply)
{
    const { categoryId } = req.params;
    await categoriesRepo.deleteById(categoryId);
    return reply.status(200).send({ message: "Successfully deleted." });
}

export default async function (app, opts) {
    app.get("/transactions/categories", getCategories);
    app.put("/transactions/categories/:categoryId", updateCategory);
    app.delete("/transactions/categories/:categoryId", deleteCategory);
};