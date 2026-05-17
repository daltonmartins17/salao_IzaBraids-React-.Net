using IzaBraids.API.Services;

namespace IzaBraids.API.Services;

public class ImageService : IImageService
{
    private readonly IWebHostEnvironment _env;
    private readonly string _basePath;

    public ImageService(IWebHostEnvironment env)
    {
        _env = env;
        // Usa WebRootPath; se for nulo, combina ContentRootPath com "wwwroot"
        _basePath = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
    }

    public async Task<string> SaveImageAsync(IFormFile file, string folder)
    {
        if (file == null || file.Length == 0) return string.Empty;

        var uploads = Path.Combine(_basePath, "uploads", folder);
        if (!Directory.Exists(uploads))
            Directory.CreateDirectory(uploads);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploads, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return $"/uploads/{folder}/{fileName}";
    }

    public void DeleteImage(string path)
    {
        if (string.IsNullOrEmpty(path)) return;
        var fullPath = Path.Combine(_basePath, path.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
        if (File.Exists(fullPath))
            File.Delete(fullPath);
    }
}