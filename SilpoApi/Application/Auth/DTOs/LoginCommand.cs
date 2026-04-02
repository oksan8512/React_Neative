
using MediatR;

namespace Application.Auth.DTOs;

// IRequest<LoginResponseDto> повідомляє MediatR,
// який тип повернути і який Handler шукати.
public class LoginCommand : IRequest<LoginResponseDto>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
