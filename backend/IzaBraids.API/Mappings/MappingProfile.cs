using AutoMapper;
using IzaBraids.API.DTOs;
using IzaBraids.API.Models;

namespace IzaBraids.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ServicoCreateDTO, Servico>();
        CreateMap<Servico, ServicoDTO>();

        CreateMap<ProdutoCreateDTO, Produto>();
        CreateMap<Produto, ProdutoDTO>();

        CreateMap<ProfissionalCreateDTO, Profissional>();
        CreateMap<Profissional, ProfissionalDTO>();

        CreateMap<GaleriaCreateDTO, Galeria>();
        CreateMap<Galeria, GaleriaDTO>();

        CreateMap<MarcacaoCreateDTO, Marcacao>();
        CreateMap<Marcacao, MarcacaoDTO>()
            .ForMember(dest => dest.NomeCliente, opt => opt.MapFrom(src => src.Cliente!.Nome))
            .ForMember(dest => dest.NomeServico, opt => opt.MapFrom(src => src.Servico!.Nome))
            .ForMember(dest => dest.NomeProfissional, opt => opt.MapFrom(src => src.Profissional!.Nome));
    }
}