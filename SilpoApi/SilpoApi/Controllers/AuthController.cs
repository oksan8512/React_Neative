
using Application.Auth.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace SilpoApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]

/// <summary>
/// Через IMediator контролер віддправляє команди,
/// не знаючи про їх реалізацію, що сприяє слабкому зв'язку
/// між компонентами та полегшує тестування.
/// </summary> 

public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        try
        {
            // Send - це метод IMediator, який відправляє команду до LoginCommandHandler ).
            var result = await mediator.Send(new LoginCommand
            {
                Email = request.Email,
                Password = request.Password
            }); return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

