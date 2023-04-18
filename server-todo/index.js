const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let DATA = [
    { id: "todo-0", name: "Mangia", completed: true },
    { id: "todo-1", name: "Dormi", completed: false },
    { id: "todo-2", name: "Ripeti", completed: false }
  ];
  app.get('/todos', (req, res) => {
    console.log(res);
    res.status(200).json(DATA);
});
app.post('/todos', (req, res) => {
    const dati = req.body;
/*     if(res.data.dati){
        console.log(res);
    } */
    if(dati.text){
        let id_add = Math.random();
        if(id_add<=2){
            id_add = "todo-"+id_add*3;
        }else{
            id_add = "todo-"+id_add;
        }
        DATA.push({id: id_add, name: dati.text, completed: false});
    }else if(dati.id_modifica && dati.mod){
        let length =  DATA.length;
        for(let i = 0; i<length; i++){
            if(DATA[i]["id"] == dati.id_modifica){
                DATA[i]["name"] = dati.mod;
            }
        }
        res.status(200).json(DATA);
    }else if(dati.id_delete){        
        let length =  DATA.length;
        for(let i = 0; i<length; i++){
            if(DATA[i]["id"] == dati.id_delete){
                delete DATA[i];
            }
        }
        let j = 0;
        let DataBK = [];
        for(let i = 0; i<length; i++){
            if(DATA[i]){
                DataBK[j] = DATA[i];
                j++;
            }            
        }
        DATA = [];
        DATA = DataBK;
        res.status(200).json(DATA);
    }else{
        res.status(200).json(dati);
    }
    //res.send(dati);
    res.status(200).json(DATA);
});

app.post('/todo', (req, res) => {
    const dati = req.body.dati;
    console.log(dati);
    if(dati.id){
/*         let lista_elementi_selezionati = DATA.filter(elem=>{
            return dati.id == elem.id;
        })
        console.log(lista_elementi_selezionati);
        lista_elementi_selezionati[0] = dati;
        console.log("----------------");
        console.log(lista_elementi_selezionati); */
        DATA = DATA.map(elem=>{
            if(elem.id==dati.id){
                return dati;
            }else{
                return elem;
            }
        })
    }
    console.log(DATA);
    res.status(200).json(DATA);
});

app.get('/', (req, res) => {
    res.send('ciao');
});


app.listen(port, () => console.log(`Listening on port ${port}!`));