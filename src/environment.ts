const environments = {
    dev: {
        api: 'http://localhost:8000/api'
    },
    prod: {
        api: 'https://api.maisondesante.org.pe/api'
    }
};

// multi environment support added
const environment = () => {
    return environments.prod;
}

export default environment
