const API_KEY = "sec_IzeJVdfB5jwge6EbxklP0NDq993j82g4";

const SOURCE_IDS = {
  SOURCE_ID_1: "src_UGvTNPSqA0nSJDe42tsse",
  SOURCE_ID_2: "src_bTuRn0l9aa6oQoaWSyCRG",
  SOURCE_ID_3: "src_peQFSfItuUX3aLra4z4oz",
};

export const getApiKey = () => API_KEY;

export const getSourceId = (choice) => {
  switch (choice) {
    case 1:
      return SOURCE_IDS.SOURCE_ID_1;
    case 2:
      return SOURCE_IDS.SOURCE_ID_2;
    case 3:
      return SOURCE_IDS.SOURCE_ID_3;
    default:
      throw new Error("Invalid source");
  }
};