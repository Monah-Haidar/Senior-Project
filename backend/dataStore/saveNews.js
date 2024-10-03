import New from "../models/new.js";

const saveNewsData = async (dataList) => {
  try {
    await New.sync({force: false});

    for (const data of dataList) {
      await New.findOrCreate({
        where: {
          title: data.title,
          publication_time: data.publication_time,
          source_name: data.source_name,
        },
        defaults: {
          title: data.title,
          publication_time: data.publication_time,
          source_name: data.source_name,
          news_url: data.news_url,
          related_instruments: data.related_instruments,
          img_url: data.img_url,
          sentiment: data.sentiment,
          category: data.category,
        },
      });
    }

    console.log("News Saved successfuly");
    
  } catch (err) {
    console.log(err);
  }
};

export default saveNewsData;
