const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Disappeared = require('../models/Disappeared'); // Certifique-se de que o modelo Disappeared esteja corretamente definido no Sequelize
const dayjs = require('dayjs');

// Configuração do armazenamento de arquivos com `multer`
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
})  

const upload = multer({ storage: storage });

const createDisappeared = async (req, res) => {
  console.log('Files:', req.files); // Verifique se os arquivos estão chegando
  console.log('Body:', req.body);
  
    const {
      CPF,
      FullName,
      BirthDate,
      Gender,
      LastSeenLocation,
      LastSeenDate,
      City,
      State,
      PostalCode,
      SkinColor,
      EyeColor,
      Characteristics,
      Hair,
      Illness,
      IllnessDescription,
      ClothingWorn,
      Vehicle,
      VehicleDescription,
      BoVerified,
    } = req.body;
  
    // Limpar CPF e CEP removendo caracteres especiais
    const cleanCpf = CPF ? CPF.replace(/\D/g, '') : null;
    const cleanPostalCode = PostalCode ? PostalCode.replace(/\D/g, '') : null;
  
    try {
      if (!cleanCpf) {
        return res.status(400).json({ error: 'CPF is required' });
      }
  
      const existingDisappeared = await Disappeared.findOne({ where: { Cpf: cleanCpf } });
      if (existingDisappeared) {
        return res.status(400).json({ error: 'CPF already in use' });
      }
      const formattedBirthDate = dayjs(BirthDate, 'DD/MM/YYYY').isValid() ? dayjs(BirthDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;
      const formattedLastSeenDate = dayjs(LastSeenDate, 'DD/MM/YYYY').isValid() ? dayjs(LastSeenDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;

    if (!formattedBirthDate || !formattedLastSeenDate) {
      return res.status(400).json({ error: 'Invalid date format. Use DD/MM/YYYY.' });
    }
  
      // Caminhos dos arquivos recebidos (se existirem)
      const photoPath = req.files['photo'] ? req.files['photo'][0].path : null;
      const boDocumentPath = req.files['boDocument'] ? req.files['boDocument'][0].path : null;
  
      // Criar novo registro
      const newDisappeared = await Disappeared.create({
        CPF: cleanCpf,
        FullName,
        BirthDate,
        Gender,
        LastSeenLocation,
        LastSeenDate,
        City,
        State,
        PostalCode: cleanPostalCode,
        SkinColor,
        EyeColor,
        Characteristics,
        Hair,
        Illness,
        IllnessDescription,
        ClothingWorn,
        Vehicle,
        VehicleDescription,
        BoDocument: boDocumentPath,
        BoVerified,
        Photo: photoPath
      });
  
      res.status(201).json({
        message: 'Disappeared person registered successfully',
        disappeared: newDisappeared
      });
    } catch (error) {
      console.error('Error during disappeared registration:', error.message);
      res.status(500).json({
        error: 'An error occurred while registering disappeared person',
        details: error.message
      });
    }
  };
  
  module.exports = {
    createDisappeared: [upload.fields([{ name: 'photo' }, { name: 'boDocument' }]), createDisappeared]
  };
  
