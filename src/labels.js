const To = (addr) => {
    return {
        type: "to",
        value: addr,
        f: (a) => a.to.text.indexOf(addr) !== -1,
    };
};

const From = (addr) => {
    return {
        type: "from",
        value: addr,
        f: (a) => a.from.text.indexOf(addr) !== -1,
    };
};

const Subject = (text) => {
    return {
        type: "subject",
        value: text,
        f: (a) => a.subject && a.subject.indexOf(text) !== -1,
    };
};

parse = (s) => {
    let i = s.indexOf(':');
    if (i == -1) {
        return null;
    }

    let type = s.substring(0, i).trim();
    let value = s.substring(i + 1).trim();

    switch (type) {
    case "to":
        return To(value);
    case "from":
        return From(value);
    case "subject":
        return Subject(value);
    }

    return null;
};

module.exports = {
    To,
    From,
    Subject,
    parse
};
