using Application.Auth.DTOs;
using Application.Interfaces;
using Application.Settings;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Application.Auth.Refresh;

public class RefreshTokenCommandHandler(
    UserManager<UserEntity> userManager,
    IJwtService jwtService,
    IOptions<JwtSettings> jwtSettings)
    : IRequestHandler<RefreshTokenCommand, LoginResponseDto>
{
    public async Task<LoginResponseDto> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        // Шукаємо користувача за refresh token, що зберігається в БД.
        var user = userManager.Users
            .FirstOrDefault(u => u.RefreshToken == request.RefreshToken);

        if (user == null || user.RefreshTokenExpiry < DateTime.UtcNow)
            throw new Exception("Invalid or expired refresh token.");

        // Видаємо нову пару токенів і оновлюємо refresh token в БД.
        var newAccessToken = jwtService.GenerateAccessToken(user);
        var newRefreshToken = jwtService.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(jwtSettings.Value.RefreshTokenExpirationDays);
        await userManager.UpdateAsync(user);

        return new LoginResponseDto
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken
        };
    }
}