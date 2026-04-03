using Application.Auth.DTOs;
using Application.Interfaces;
using Application.Settings;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Application.Auth.Login;

/// <summary>
/// Обробник команди для входу користувача в систему.
/// </summary>
public class LoginCommandHandler(
    UserManager<UserEntity> userManager,
    IJwtService jwtService,
    IOptions<JwtSettings> jwtSettings)
    : IRequestHandler<LoginCommand, LoginResponseDto>
{
    /// <summary> 
    /// MediatoR викликає Handle() автоматично, коли надходить команда LoginCommand. 
    /// Цей метод відповідає за перевірку облікових даних користувача та генерацію токена.
    /// </summary>
    public async Task<LoginResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            throw new Exception("Invalid email or password.");
        }

        var passwordValid = await userManager.CheckPasswordAsync(user, request.Password);

        if (passwordValid == false)
        {
            throw new Exception("Invalid email or password.");
        }

        var accessToken = jwtService.GenerateAccessToken(user);
        var refreshToken = jwtService.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(jwtSettings.Value.RefreshTokenExpirationDays);
        await userManager.UpdateAsync(user);

        return new LoginResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }
}