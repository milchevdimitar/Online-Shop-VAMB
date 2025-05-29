import SecretModel from "../models/const&secretsModel.js";

export const getSettings = async (req, res) => {
  try {
    const doc = await SecretModel.findOne({ name: req.params.name });
    if (!doc) return res.json({ success: false, message: 'Настройка не е намерена' });
    res.json({ success: true, settings: doc.key });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { key } = req.body;
    if (!key) return res.status(400).json({ success: false, message: 'Няма подадени настройки' });

    const updated = await SecretModel.findOneAndUpdate(
      { name: req.params.name },
      { key },
      { new: true, upsert: true }
    );

    res.json({ success: true, settings: updated.key });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
