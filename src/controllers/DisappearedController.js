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

      const photoUri = photoPath 
      ? `${req.protocol}://${req.get('host')}/uploads/${path.basename(photoPath)}`
      : null;

    const boDocumentUri = boDocumentPath
      ? `${req.protocol}://${req.get('host')}/uploads/${path.basename(boDocumentPath)}`
      : null;
  
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

  const getAllDisappeared = async (req, res) => {
    try {
      const disappearedPeople = await Disappeared.findAll({
        attributes: [
          'Cpf', // Usado como chave
          ['FullName', 'name'],
          'Gender',
          ['BirthDate', 'birthDate'], // Para calcular idade
          ['LastSeenLocation', 'lastView'],
          ['LastSeenDate', 'dateMiss'],
          ['City', 'address'],
          ['SkinColor', 'skin'],
          ['EyeColor', 'eyesColor'],
          'Characteristics',
          'Hair',
          ['IllnessDescription', 'illnessDescription'],
          'ClothingWorn',
          ['VehicleDescription', 'vehicleDescription'],
          'Photo' // BLOB do banco
        ]
      });
  
      // Processa os dados
      const processedPeople = disappearedPeople.map(person => {
        const personData = person.get({ plain: true });
  
        // Calcula a idade com base na data de nascimento
        const age = personData.birthDate
          ? Math.floor((new Date() - new Date(personData.birthDate)) / (365.25 * 24 * 60 * 60 * 1000))
          : null;


          let photoUri = null;
      if (personData.Photo && Buffer.isBuffer(personData.Photo)) {
        // Generate a unique filename
        const filename = `missing_person_${personData.Cpf}_${Date.now()}.jpg`;
        const filepath = path.join(__dirname, 'uploads', filename);

        try {
          // Ensure uploads directory exists
          const uploadsDir = path.join(__dirname, 'uploads');
          if (!fs.existsSync(uploadsDir)){
            fs.mkdirSync(uploadsDir, { recursive: true });
          }

          // Write buffer to file
          fs.writeFileSync(filepath, personData.Photo);

          // Create URL for the image
          photoUri = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
        } catch (fileError) {
          console.error('Error saving photo:', fileError);
        }
      }

      return {
        ...personData,
        age,
        clothes: personData.ClothingWorn,
        photoUri
      };
    });

    return res.status(200).json(processedPeople);
  } catch (error) {
    console.error('Error fetching disappeared people:', error.message);
    return res.status(500).json({
      error: 'An error occurred while fetching disappeared people',
      details: error.message
    });
  }
};
  
  
  module.exports = {
    createDisappeared: [upload.fields([{ name: 'photo' }, { name: 'boDocument' }]), createDisappeared], getAllDisappeared
  } ;
  
