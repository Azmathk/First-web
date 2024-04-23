const {reactionEmojis} = require('../../Library/emoji');
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const generateCardNumber = (bin, cardType) => {
    if (bin.length < 6) {
        throw new Error('Invalid BIN format. It should be at least 6 digits long.');
    }

    const remainingDigits = 16 - bin.length;
    const randomDigits = Array.from({ length: remainingDigits }, () => getRandomInt(0, 9)).join('');
    return bin + randomDigits;
}

const generateRandomBIN = (format) => {
    let bin = '';
    for (let i = 0; i < format.length; i++) {
        if (format[i] === 'x') {
            bin += getRandomInt(0, 9).toString();
        } else {
            bin += format[i];
        }
    }
    return bin;
}
const determineCardType = (bin) => {
    console.log(`Debug: bin = ${bin}`); // Add this line for debugging

    if (bin.startsWith('4')) return 'Visa Card';
    if (bin.startsWith('5')) return 'MasterCard';
    if (bin.startsWith('34') || bin.startsWith('37')) return 'American Express';
    if (bin.startsWith('6011')) return 'Discover';
    if (bin.startsWith('300') || bin.startsWith('301') || bin.startsWith('302') || bin.startsWith('303') || bin.startsWith('304') || bin.startsWith('305') || bin.startsWith('36') || bin.startsWith('38')) return 'Diners Club';
    if (bin.startsWith('2131') || bin.startsWith('1800') || bin.startsWith('35')) return 'JCB';
    if (bin.startsWith('62')) return 'UnionPay';
    if (bin.startsWith('50') || bin.startsWith('56') || bin.startsWith('57') || bin.startsWith('58') || bin.startsWith('6')) return 'Maestro';
    return 'Unknown';
}

const getRandomBankName = () => {
    const bankNames = [
        'Bank of America',
        'JPMorgan Chase & Co.',
        'Wells Fargo',
        'Citibank',
        'HSBC',
        'BNP Paribas',
        'Mitsubishi UFJ Financial Group',
        'Santander',
        'Barclays',
        'Royal Bank of Scotland',
        'Standard Chartered',
        'Credit Suisse',
        'Deutsche Bank',
        'UBS',
        'ING Group',
        'Morgan Stanley',
        'Goldman Sachs',
        'Nomura',
        'Société Générale',
        'Commerzbank',
        'Crédit Agricole',
        'Bank of China',
        'Industrial and Commercial Bank of China',
        'China Construction Bank',
        'Agricultural Bank of China',
        'Bank of Communications',
        'The Hongkong and Shanghai Banking Corporation (HSBC)',
        'China Merchants Bank',
        'China CITIC Bank',
        'Ping An Bank',
        'Shanghai Pudong Development Bank',
        'China Minsheng Bank',
        'Industrial Bank',
        'China Everbright Bank',
        'China Guangfa Bank',
        'Shenzhen Development Bank',
        'China Zheshang Bank',
        'Hua Xia Bank',
        'Bank of Shanghai',
        'Bank of Beijing',
        'Bank of Jiangsu',
        'Bank of Ningbo',
        'Bank of Hangzhou',
        'Bank of Nanjing',
        'Bank of India',
        'Canara Bank',
        'HDFC Bank',
        'ICICI Bank',
        'Axis Bank',
        'State Bank of India',
        'Bank of Baroda',
        'Punjab National Bank',
        'Bank of Maharashtra',
        'IndusInd Bank',
        'Federal Bank',
        'Kotak Mahindra Bank',
        'Yes Bank',
        'IDBI Bank',
        'Union Bank of India',
        'Indian Overseas Bank',
        'UCO Bank',
        'Indian Bank',
        'Central Bank of India',
        'Dena Bank',
        'Corporation Bank',
        'Oriental Bank of Commerce',
        'Syndicate Bank',
        'Andhra Bank',
        'Vijaya Bank',
        'Lloyds Banking Group',
        'Barclays',
        'HSBC Holdings',
        'Royal Bank of Scotland Group',
        'Standard Chartered',
        'Santander UK',
        'Co-operative Bank',
        'Nationwide Building Society',
        'Clydesdale Bank',
        'Tesco Bank',
        'Virgin Money',
        'Bank of Ireland',
        'Danske Bank',
        'Ulster Bank',
        // Can add more bank names here
      ];
      
    const randomIndex = Math.floor(Math.random() * bankNames.length);
    return bankNames[randomIndex];
  };
  
  const determineIssuer = (bin) => {
    console.log(`Debug: bin = ${bin}`); // Add this line for debugging
  
    // Array of bank names which will give random bank name
    if (bin.startsWith('4')) return getRandomBankName();
    if (bin.startsWith('5')) return getRandomBankName();
    if (bin.startsWith('34') || bin.startsWith('37')) return getRandomBankName();
    if (bin.startsWith('6011')) return getRandomBankName();
    if (bin.startsWith('300') || bin.startsWith('301') || bin.startsWith('302') || bin.startsWith('303') || bin.startsWith('304') || bin.startsWith('305') || bin.startsWith('36') || bin.startsWith('38')) return getRandomBankName();
    if (bin.startsWith('2131') || bin.startsWith('1800') || bin.startsWith('35')) return getRandomBankName();
    if (bin.startsWith('62')) return getRandomBankName();
    if (bin.startsWith('50') || bin.startsWith('56') || bin.startsWith('57') || bin.startsWith('58') || bin.startsWith('6')) return getRandomBankName();
  
    // If none of the known patterns match, return 'Unknown' as a fallback.
    return 'Unknown';
  };
  

  const generateRandomCardInfo = (format, numCards, specifiedMonth, specifiedYear, specifiedCVV) => {
    if (!format || format.length < 6) {
        throw new Error('Invalid format. It should be at least 6 characters long.');
    }

    const cards = [];
    for (let i = 0; i < numCards; i++) {
        try {
            const bin = generateRandomBIN(format);
            const cardType = determineCardType(bin);
            const issuer = determineIssuer(bin);
            const cardNumber = generateCardNumber(bin, cardType);

            let expiryMonth = specifiedMonth;
            let expiryYear = specifiedYear;

            if (specifiedMonth === 'xx') {
                expiryMonth = getRandomInt(1, 12).toString().padStart(2, '0');
            }

            if (specifiedYear === '20xx') {
                expiryYear = (2023 + i + getRandomInt(0, 9)).toString();
            }

            let cvv = specifiedCVV;

            if (cvv === 'xxx') {
                cvv = getRandomInt(100, 999).toString();
            }

            cards.push({ bin, cardType, issuer, cardNumber, expiryMonth, expiryYear, cvv });
        } catch (error) {
            console.error(`Error generating card info: ${error.message}`);
        }
    }
    return cards;
}


const formatCardInfo = (card) => {
    const cvvPlaceholder = 'xxx';
    const formattedCVV = card.cvv !== undefined ? card.cvv : cvvPlaceholder.replace(/x/g, () => getRandomInt(0, 9).toString());
    return `${card.cardNumber}|${card.expiryMonth}|${card.expiryYear}|${formattedCVV}`;
}

module.exports.execute = async (client, flag, arg, M) => {
    const parts = arg.split('|');
    if (parts.length < 1) {
        M.reply('This is an invalid format. Please provide at least a BIN. Use the format: e.g., !gen 415464xxxxxx|11|2023|xxx.');
        return;
    }

    const format = parts[0];

    // Check if the format is at least 6 characters long and not more than 16 characters
    if (format.length < 6 || format.length > 16) {
        M.reply('This is an invalid format. Please provide a BIN format with 6 to 16 characters. Use the format: e.g., !gen 415464xxxxxx|11|2023|xxx.');
        return;
    }

    const specifiedMonth = parts[1] || 'xx';
    const specifiedYear = parts[2] || '20xx';
    const specifiedCVV = parts[3] || 'xxx';

    const numCards = 10; // Always generate exactly 10 cards.

    const cardInfo = generateRandomCardInfo(format, numCards, specifiedMonth, specifiedYear, specifiedCVV);

    const response = `𝗕𝗜𝗡 ⇾ ${format.slice(0, 6)}\n𝗔𝗺𝗼𝘂𝗻𝘁 ⇾ ${numCards}\n\n${cardInfo.map(formatCardInfo).join('\n')}\n\n𝗖𝗮𝗿𝗱 𝗧𝘆𝗽𝗲 ⇾ ${cardInfo[0].cardType} 📊\n𝐈𝐬𝐬𝐮𝐞𝐫 ⇾ ${cardInfo[0].issuer} 🏢\n\n𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗕𝘆 ⇾ @GetBenefits 🔥`;

    const messageOptions = {
        text: response,
        contextInfo: {
            externalAdReply: {
                title: '📚 CC Generator',
                body: '@GetBenefits',
                thumbnail: await client.utils.getBuffer('https://i.pinimg.com/564x/f2/7b/d3/f27bd3c1a4ab290c8138c59b0aefd737.jpg'),
                mediaType: 1,
                mediaUrl: '',
                sourceUrl: 'https://chat.whatsapp.com/FvjX39MiPWp0KlPUpGd8mk',
                ShowAdAttribution: true,
            },
        },
    };
    await client.sendMessage(M.from, messageOptions, { quoted: M });
    const reactionMessage = {
        react: {
            text: reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)],
            key: M.key, 
        }
    };
    await client.sendMessage(M.from, reactionMessage, { sendEphemeral: true });
    return;
};
module.exports.command = {
    name: 'generate',
    aliases: ['gen'],
    category: 'general',
    usage: 'bin',
    exp: 15,
    description: 'Generate exactly 10 random card information based on BIN format',
};


