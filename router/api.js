const router = require("express").Router();
const axios = require("axios");

const authUser = async (data) => {
  let config = {
    headers: {
      "Bankin-Version": "2019-02-18",
      "Content-Type": "application/json",
      "Client-Id": "775683bc70d94beaa8044c81b2f16006",
      "Client-Secret":
        "sMgdYUzUPpo1DxbR67qP2ZbuTmU7H9gikvWPigDnQro9fk0PsRcb4EvI0iRheAJr",
    },
  };
  try {
    const res = await axios.post(
      "https://sync.bankin.com/v2/authenticate",
      {
        email: "user1@mail.com",
        password: "a!Strongp#assword1",
      },
      config
    );
    return res.data.access_token;
  } catch (err) {
    return "auth error";
  }
};
const getAccounts = async (token) => {
  let config = {
    headers: {
      "Bankin-Version": "2019-02-18",
      "Content-Type": "application/json",
      "Client-Id": "775683bc70d94beaa8044c81b2f16006",
      "Client-Secret":
        "sMgdYUzUPpo1DxbR67qP2ZbuTmU7H9gikvWPigDnQro9fk0PsRcb4EvI0iRheAJr",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(
      "https://sync.bankin.com/v2/accounts",
      config
    );
    return res.data;
  } catch (error) {
    return `account error${error}`;
  }
};
router.get("/info", async (req, res) => {
  try {
    const token = await authUser({
      email: "user1@mail.com",
      password: "a!Strongp#assword1",
    });
    const result = await getAccounts(token);
    let rounded_sum = 0;
    let accounts = [];
    result.resources.forEach((element) => {
      accounts.push({ name: element.name, balance: element.balance });
      rounded_sum += element.balance;
      rounded_sum = Math.ceil(rounded_sum / 100) * 100;
    });
    return res
      .status(200)
      .json({ rounded_sum: rounded_sum, accounts: accounts });
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
