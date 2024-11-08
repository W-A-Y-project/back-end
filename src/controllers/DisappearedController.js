const { Disappeared } = require('../models/Disappered'); // Certifique-se de que o modelo Disappeared esteja corretamente definido no Sequelize

const registerDisappeared = async (req, res) => {
    const { 
        cpf, 
        fullName, 
        birthDate, 
        gender, 
        lastSeenLocation, 
        lastSeenDate, 
        city,
        state,
        postalCode,
        skinColor, 
        eyeColor, 
        characteristics, 
        hair, 
        illness, 
        illnessDescription, 
        clothingWorn, 
        vehicle, 
        vehicleDescription, 
        boDocument, 
        photo 
    } = req.body;

    const cleanCPF = cpf.replace(/\D/g, ''); 

    try {
        // Verificar se já existe um desaparecido com o mesmo CPF
        const existingDisappeared = await Disappeared.findOne({ where: { CPF: cpf } });
        if (existingDisappeared) {
            return res.status(400).json({ error: 'CPF already registered for a disappeared person' });
        }

        // Criar o novo registro de desaparecido
        const newDisappeared = await Disappeared.create({
            CPF: cleanCPF,  // Remove qualquer caractere não numérico do CPF
            FULL_NAME: fullName,
            BIRTH_DATE: birthDate,
            GENDER: gender,
            LAST_SEEN_LOCATION: lastSeenLocation,
            LAST_SEEN_DATE: lastSeenDate,
            CITY: city,
            STATE: state,
            POSTAL_CODE: postalCode,
            SKIN_COLOR: skinColor,
            EYE_COLOR: eyeColor,
            CHARACTERISTICS: characteristics || null,  // Se não fornecido, será nulo
            HAIR: hair,
            ILLNESS: illness,
            ILLNESS_DESCRIPTION: illness ? illnessDescription : null,  // Preenche somente se 'illness' for true
            CLOTHING_WORN: clothingWorn || null,  // Se não fornecido, será nulo
            VEHICLE: vehicle,
            VEHICLE_DESCRIPTION: vehicle ? vehicleDescription : null,  // Preenche somente se 'vehicle' for true
            BO_DOCUMENT: boDocument,  // Assumindo que boDocument já foi enviado como BLOB
            Photo: photo || null,  // Se não fornecido, será nulo
            BO_VERIFIED: 'Pending'  // Valor padrão
        });

        // Resposta de sucesso
        res.status(201).json({ message: 'Disappeared person registered successfully', disappeared: newDisappeared });
    } catch (error) {
        console.error('Error during disappeared registration:', error.message);
        res.status(500).json({ error: 'An error occurred while registering the disappeared person', details: error.message });
    }
};

module.exports = {
    registerDisappeared,
};
