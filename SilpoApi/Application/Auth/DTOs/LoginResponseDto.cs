namespace Application.Auth.DTOs;

public class LoginResponseDto
{
    public string AccessToken { get; set; } = string.Empty;
    // Refresh token повертається клієнту для оновлення access token.
    public string RefreshToken { get; set; } = string.Empty;
}