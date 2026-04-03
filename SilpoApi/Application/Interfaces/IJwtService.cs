using Domain.Entities.Identity;

namespace Application.Interfaces;

public interface IJwtService
{
    string GenerateAccessToken(UserEntity user);
    string GenerateRefreshToken();
}