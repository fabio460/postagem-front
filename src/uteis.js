export function dataTransform(data) {
    let dataBruta = data.split("T")
    let dias = dataBruta[0].split('-')
    let horas = dataBruta[1].split(":")
    switch (dias[1]) {
        case '01':
            dias[1] = "Janeiro"
            break;
        case '02':
            dias[1] = "Fevereiro"
            break;
        case '03':
            dias[1] = "Março"
            break;       
        
        case '04':
            dias[1] = "Abril"
            break;
        case '05':
            dias[1] = "Maio"
            break;
        case '06':
            dias[1] = "Junho"
            break;   
        case '07':
            dias[1] = "Julho"
            break;
        case '08':
            dias[1] = "Agosto"
            break;
        case '09':
            dias[1] = "Setembro"
            break;     
        case '10':
            dias[1] = "Outubro"
            break;
        case '11':
            dias[1] = "Novembro"
            break;
        case '12':
            dias[1] = "Dezembro"
            break;             
        default:
            break;
    }
    let hora = parseInt(horas[0])-3
    let minutos = parseInt(horas[1])+3
    if (hora < 10) {
        hora = "0"+hora.toString()
    }
    if (minutos < 10) {
        minutos = "0"+minutos.toString()
    }

    return dias[2]+" de "+dias[1]+" as "+hora+":"+minutos
}

export function deletar(item){
    let arquivo = item.imagem.split('/')
    let fileName = arquivo[arquivo.length - 1]
    const formdata = new FormData()
    formdata.append("_id",item._id)
    formdata.append("fileName",fileName)
    fetch("https://postagem-back.vercel.app/delete",{
        method:"DELETE",
        body:formdata
    })
  
  }