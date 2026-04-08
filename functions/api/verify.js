export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const { categoryCode, password } = body;

        const { results } = await context.env.DB.prepare(
            "SELECT quiz_password, is_visible FROM categories WHERE code = ?"
        ).bind(categoryCode).all();

        if (results.length === 0) {
            return Response.json({ success: false, error: "Category not found" }, { status: 404 });
        }

        const category = results[0];

        if (!category.is_visible) {
            return Response.json({ success: false, error: "Category is not currently active" }, { status: 403 });
        }

        if (password === category.quiz_password) {
            return Response.json({ success: true });
        } else {
            return Response.json({ success: false, error: "Incorrect password for category" }, { status: 401 });
        }
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}