using Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(Application.Auth.Login.LoginCommandHandler).Assembly));

builder.Services.AddInfrastructureServices(builder.Configuration);

var app = builder.Build();

app.MapOpenApi();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/openapi/v1.json", "v1");
    options.OAuthUsePkce();
});

// UseAuthentication має бути перед UseAuthorization.
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();