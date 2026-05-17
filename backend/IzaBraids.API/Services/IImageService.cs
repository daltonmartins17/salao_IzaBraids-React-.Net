namespace IzaBraids.API.Services;

public interface IImageService
{
    Task<string> SaveImageAsync(IFormFile file, string folder);
    void DeleteImage(string path);
}