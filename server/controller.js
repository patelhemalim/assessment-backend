let perfumes = require('./db.json');
let globalId = 7

module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];

        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const cookies = ["It takes courage to admit fault.", "Now is the time to try something new.", "Success is a journey, not a destination.", "The only people who never fail are those who never try.", "Things don’t just happen; they happen just."];

        let randomIndex = Math.floor(Math.random() * cookies.length);
        let randomCookie = cookies[randomIndex];
        res.status(200).send(randomCookie);
    },
    getPerfumes: (req, res) => {
        res.status(200).send(perfumes)
    },
    creatPerfume: (req, res) => {
        const { title, price, fragrance,qty, imageURL } = req.body;
        let newPerfume = {
            id: globalId,
            title: title,
            price: +price,
            fragrance: fragrance,
            qty:qty,
            imageURL: imageURL
        }
        perfumes.push(newPerfume);
        globalId++
        res.status(200).send(perfumes)
    },
    updatePerfume: (req, res) => {
        const { type } = req.body;
        let index = perfumes.findIndex(elem => elem.id === +req.params.id)
        if (type === 'minus' && perfumes[index].qty > 0) {
            perfumes[index].qty  -= 1;
            res.status(200).send(perfumes);
        } else if (type === 'plus') {
            perfumes[index].qty  += 1;
            res.status(200).send(perfumes);
        } else {
            res.status(400).send('No more changes please!')
        }
    },
    deletePerfume: (req, res) => {
        let index = perfumes.findIndex(elem => elem.id === +req.params.id)
        perfumes.splice(index, 1);
        res.status(200).send(perfumes)
    }
}