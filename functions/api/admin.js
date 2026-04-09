export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const { adminKey, action } = body;

        // Fetch admin key from DB
        const { results: adminSettings } = await context.env.DB.prepare(
            "SELECT master_key FROM admin_settings WHERE id = 1"
        ).all();

        const MASTER_ADMIN_KEY = adminSettings.length > 0 ? adminSettings[0].master_key : "super_secret_admin_key_123";

        if (adminKey !== MASTER_ADMIN_KEY) {
            return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        if (action === "fetch") {
            const { results } = await context.env.DB.prepare(
                "SELECT * FROM categories ORDER BY code"
            ).all();

            return Response.json({ success: true, categories: results });

        } else if (action === "update") {
            const { categories } = body; // Array of objects

            // For simple bulk update
            for (let cat of categories) {
                await context.env.DB.prepare(
                    "UPDATE categories SET is_visible = ?, quiz_password = ? WHERE code = ?"
                ).bind(cat.is_visible ? 1 : 0, cat.quiz_password, cat.code).run();
            }

            return Response.json({ success: true });
            
        } else if (action === "update_key") {
            const { newKey } = body;

            if (!newKey || newKey.length < 4) {
               return Response.json({ success: false, error: "New key must be at least 4 characters long" }, { status: 400 }); 
            }

            await context.env.DB.prepare(
                "UPDATE admin_settings SET master_key = ? WHERE id = 1"
            ).bind(newKey).run();

            return Response.json({ success: true });
            
        } else {
            return Response.json({ success: false, error: "Unknown action" }, { status: 400 });
        }

    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}
