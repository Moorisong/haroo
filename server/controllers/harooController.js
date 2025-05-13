const { Haroo } = require('../models/Haroo');

const initHaroo = async (req, res) => {
  try {
    const existing = await Haroo.findOne();
    if (existing) {
      return res.status(200).json({ message: '하루 이미 존재함' });
    }

    const newHaroo = new Haroo();
    await newHaroo.save();
    res.status(201).json({ message: '하루 생성 완료', haroo: newHaroo });
  } catch (err) {
    res.status(500).json({ message: 'Haroo 생성 중 에러가 발생했습니다.', err });
  }
};

module.exports = { initHaroo };
