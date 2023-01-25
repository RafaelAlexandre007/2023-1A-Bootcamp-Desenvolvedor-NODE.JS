import express from "express";
import carrosRouter from "./carrosRouter.js";

const app = express();

app.use(express.json());


/*
//Aula 1
app.get("/", (req, res) => {
    res.send("Hello World!!");
});

app.post("/", (req, res) => {
    const a = 3;
    const b = 5;
    const resultado = soma(a, b);
    res.send("Resultado: " + resultado);
})

function soma(a, b) {
    const resultado = a + b;
    return resultado
}

//Aula 2

app.all("/testAll", (req, res) => {
    res.send(req.method);
});

app.get("teste?", (_req, res) => {
    res.send("/teste?");
})

app.get("/buzz+", (_req, res) => {
    res.send("/buzz+");
})

app.get("/one*Blue", (_req, res) => {
    res.send(_req.path);
})

app.get("/test(ing)", (_req, res) => {

    res.send("/test(ing)");
})

*/

app.post("/test(ing)", (_req, res) => {
    console.log(_req.body);
    res.send("/test(ing)");
})

app.post(/.*Red$/, (_req, res) => {

    res.send("/.*Red$/");
})
//Parametros na rota
app.get("/testParam/:id/:a?", (req, res) => {
    res.send(req.params.id + " " + req.params.a);
})

//Parametros nvia query
app.get("/testQuery", (req, res) => {
    res.send(req.query);
})

//Next
const callback1 = (req, res, next) => {
    console.log("Calback 1");
    next();
}

app.get("/testMultipleHandlers", (req, res, next) => {
    console.log("Callback 1");
    next();
}, (req, res) => {
    console.log("Callback 2");
    res.end();
})

// Next com Array
function callback2(req, res, next) {
    console.log("Calback 2");
    next();
}

const callback3 = (req, res) => {
    console.log("Calback 3");
    res.end();
}

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

//Route
app.route("/testeRoute")
    .get((req, res) => {
        res.send("/testeRoute GET");
    })
    .post((req, res) => {
        res.send("/testeRoute POST");
    })
    .delete((req, res) => {
        res.send("/testeRoute DELETE");
    })



//Nível aplicação
app.use((req, res, next) => {
    console.log(new Date());
    next();
})

//Nível roteador
app.use("/carros", carrosRouter);

//Tratamento de erros
app.get("/erro1", (req, res) => {
    throw new Error("Error message test");
})

app.get("/erro1", async (req, res, next) => {
    try {
        
        throw new Error("Error message async");
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    console.log("Erro1");
    res.status(500).send("Ocorreu o erro1");
    next(err);
})
app.use((err, req, res, next) => {
    console.log("Erro2");
    res.status(500).send("Ocorreu o erro2");

})

//-----------------------------
app.listen(3000, () => {
    console.log("API Started!")
})
