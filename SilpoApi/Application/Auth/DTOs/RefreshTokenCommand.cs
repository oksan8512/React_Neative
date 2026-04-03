using MediatR;

namespace Application.Auth.DTOs;

// MediatR знайде RefreshTokenHandler за цим IRequest при виклику mediator.Send().
public class RefreshTokenCommand : IRequest<LoginResponseDto>
{
    public string RefreshToken { get; set; } = string.Empty;
}