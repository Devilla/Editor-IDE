import axios from 'axios';

const key = 'trnsl.1.1.20181022T141536Z.801da2156e9d41fb.c6eb103cd49b4068b3366a428664c33c9bd160e6';

  export async function  askSusi (chatbot) {
    const response = await axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+key+'&lang='+'fr'+'&text='+chatbot);
     var output = response.data.text[0];
     console.log("Here is translation output! ", output);
     return output;
 }
