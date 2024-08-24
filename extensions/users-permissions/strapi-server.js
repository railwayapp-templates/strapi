module.exports = (plugin) => {
  const originalAuthController = plugin.controllers.auth.callback;

  plugin.controllers.auth.callback = async (ctx) => {
    await originalAuthController(ctx);
    const userId = ctx.body.user.id; // Получаем ID пользователя из контекста

    // Извлекаем пользователя с ролью
    const userWithRole = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      userId,
      {
        populate: ["role"],
      }
    );

    // Добавляем информацию о роли в ответ
    ctx.body.user.role = userWithRole.role;
    return ctx;
  };

  return plugin;
};
