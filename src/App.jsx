import React, { useState, useEffect } from 'react';

const CompoundNamingQuiz = () => {
  // Type I cations (fixed charge)
  const type1Cations = [
    { symbol: 'Li+', name: 'lithium', charge: 1 },
    { symbol: 'Na+', name: 'sodium', charge: 1 },
    { symbol: 'K+', name: 'potassium', charge: 1 },
    { symbol: 'Rb+', name: 'rubidium', charge: 1 },
    { symbol: 'Cs+', name: 'cesium', charge: 1 },
    { symbol: 'Mg2+', name: 'magnesium', charge: 2 },
    { symbol: 'Ca2+', name: 'calcium', charge: 2 },
    { symbol: 'Sr2+', name: 'strontium', charge: 2 },
    { symbol: 'Ba2+', name: 'barium', charge: 2 },
    { symbol: 'Zn2+', name: 'zinc', charge: 2 },
    { symbol: 'Al3+', name: 'aluminum', charge: 3 },
    { symbol: 'Ga3+', name: 'gallium', charge: 3 },
    { symbol: 'Ag+', name: 'silver', charge: 1 },
    { symbol: 'Cd2+', name: 'cadmium', charge: 2 }
  ];

  // Type II cations (variable charge)
  const type2Cations = [
    { symbol: 'Cr', name: 'chromium', charges: [2, 3] },
    { symbol: 'Mn', name: 'manganese', charges: [2, 3] },
    { symbol: 'Fe', name: 'iron', charges: [2, 3] },
    { symbol: 'Co', name: 'cobalt', charges: [2, 3] },
    { symbol: 'Cu', name: 'copper', charges: [1, 2] },
    { symbol: 'Sn', name: 'tin', charges: [2, 4] },
    { symbol: 'Hg', name: 'mercury', charges: [1, 2] },
    { symbol: 'Pb', name: 'lead', charges: [2, 4] }
  ];

  // Anions
  const anions = [
    { symbol: 'N3-', name: 'nitride', charge: -3 },
    { symbol: 'O2-', name: 'oxide', charge: -2 },
    { symbol: 'S2-', name: 'sulfide', charge: -2 },
    { symbol: 'F-', name: 'fluoride', charge: -1 },
    { symbol: 'Cl-', name: 'chloride', charge: -1 },
    { symbol: 'Br-', name: 'bromide', charge: -1 },
    { symbol: 'I-', name: 'iodide', charge: -1 }
  ];

  // Type III elements (for covalent compounds)
  const type3Elements = [
    { symbol: 'H', name: 'hydrogen' },
    { symbol: 'N', name: 'nitrogen' },
    { symbol: 'O', name: 'oxygen' },
    { symbol: 'F', name: 'fluorine' },
    { symbol: 'P', name: 'phosphorus' },
    { symbol: 'S', name: 'sulfur' },
    { symbol: 'Cl', name: 'chlorine' },
    { symbol: 'Br', name: 'bromine' },
    { symbol: 'I', name: 'iodine' },
    { symbol: 'C', name: 'carbon' },
    { symbol: 'Si', name: 'silicon' }
  ];

  const prefixes = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca'];

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [selectedType, setSelectedType] = useState('all');

  const generateType1Question = () => {
    const cation = type1Cations[Math.floor(Math.random() * type1Cations.length)];
    const anion = anions[Math.floor(Math.random() * anions.length)];
    
    const cationCount = Math.abs(anion.charge);
    const anionCount = Math.abs(cation.charge);
    
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(cationCount, anionCount);
    const finalCationCount = cationCount / divisor;
    const finalAnionCount = anionCount / divisor;
    
    const formula = `${cation.symbol.replace(/\d?\+$/, '')}${finalCationCount > 1 ? finalCationCount : ''}${anion.symbol.replace(/\d?-$/, '')}${finalAnionCount > 1 ? finalAnionCount : ''}`;
    const correctAnswer = `${cation.name} ${anion.name}`;
    
    return {
      type: 'Type I',
      formula,
      correctAnswer,
      explanation: `Type I binary ionic compounds have metals with fixed charges. Simply name the cation followed by the anion.`
    };
  };

  const generateType2Question = () => {
    const cation = type2Cations[Math.floor(Math.random() * type2Cations.length)];
    const anion = anions[Math.floor(Math.random() * anions.length)];
    const charge = cation.charges[Math.floor(Math.random() * cation.charges.length)];
    
    const cationCount = Math.abs(anion.charge);
    const anionCount = Math.abs(charge);
    
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(cationCount, anionCount);
    const finalCationCount = cationCount / divisor;
    const finalAnionCount = anionCount / divisor;
    
    const formula = `${cation.symbol}${finalCationCount > 1 ? finalCationCount : ''}${anion.symbol.replace(/\d?-$/, '')}${finalAnionCount > 1 ? finalAnionCount : ''}`;
    const romanNumeral = charge === 1 ? 'I' : charge === 2 ? 'II' : charge === 3 ? 'III' : 'IV';
    const correctAnswer = `${cation.name}(${romanNumeral}) ${anion.name}`;
    
    return {
      type: 'Type II',
      formula,
      correctAnswer,
      explanation: `Type II binary ionic compounds have metals with variable charges. Use Roman numerals to indicate the charge.`
    };
  };

  const generateType3Question = () => {
    const element1 = type3Elements[Math.floor(Math.random() * type3Elements.length)];
    let element2 = type3Elements[Math.floor(Math.random() * type3Elements.length)];
    while (element2.symbol === element1.symbol) {
      element2 = type3Elements[Math.floor(Math.random() * type3Elements.length)];
    }
    
    const count1 = Math.floor(Math.random() * 4) + 1;
    const count2 = Math.floor(Math.random() * 6) + 1;
    
    const formula = `${element1.symbol}${count1 > 1 ? count1 : ''}${element2.symbol}${count2 > 1 ? count2 : ''}`;
    
    const prefix1 = count1 === 1 && element1.symbol !== 'O' ? '' : prefixes[count1];
    const prefix2 = prefixes[count2];
    
    let element2Name = element2.name;
    if (element2Name === 'oxygen') element2Name = 'oxide';
    else if (element2Name === 'sulfur') element2Name = 'sulfide';
    else if (element2Name === 'nitrogen') element2Name = 'nitride';
    else if (element2Name === 'fluorine') element2Name = 'fluoride';
    else if (element2Name === 'chlorine') element2Name = 'chloride';
    else if (element2Name === 'bromine') element2Name = 'bromide';
    else if (element2Name === 'iodine') element2Name = 'iodide';
    else if (element2Name === 'phosphorus') element2Name = 'phosphide';
    else element2Name = element2Name.slice(0, -2) + 'ide';
    
    let element1Name = element1.name;
    if (prefix1 === 'mono' && element1Name.startsWith('o')) {
      element1Name = element1Name.substring(1);
    }
    if (prefix2 === 'mono' && element2Name.startsWith('o')) {
      element2Name = element2Name.substring(1);
    }
    
    const correctAnswer = `${prefix1}${element1Name} ${prefix2}${element2Name}`;
    
    return {
      type: 'Type III',
      formula,
      correctAnswer,
      explanation: `Type III binary covalent compounds use prefixes to indicate the number of each atom. Drop 'mono' for the first element and 'o' or 'a' before 'oxide'.`
    };
  };

  const generateQuestion = () => {
    setUserAnswer('');
    setFeedback('');
    
    let question;
    if (selectedType === 'type1') {
      question = generateType1Question();
    } else if (selectedType === 'type2') {
      question = generateType2Question();
    } else if (selectedType === 'type3') {
      question = generateType3Question();
    } else {
      const types = [generateType1Question, generateType2Question, generateType3Question];
      const randomType = types[Math.floor(Math.random() * types.length)];
      question = randomType();
    }
    
    setCurrentQuestion(question);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const checkAnswer = () => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
    const normalizedCorrectAnswer = currentQuestion.correctAnswer.toLowerCase().replace(/\s+/g, ' ');
    
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    
    if (isCorrect) {
      setFeedback('✓ Correct!');
    } else {
      setFeedback(`✗ Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer.trim()) {
      if (feedback) {
        generateQuestion();
      } else {
        checkAnswer();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="bg-indigo-600 text-white p-6 rounded-t-lg">
            <h1 className="text-2xl font-bold text-center">
              Chemical Compound Naming Quiz
            </h1>
            <div className="text-center mt-2">
              <span className="text-sm">Score: {score.correct} / {score.total}</span>
              {score.total > 0 && (
                <span className="ml-4 text-sm">
                  ({Math.round((score.correct / score.total) * 100)}%)
                </span>
              )}
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Type:
              </label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  generateQuestion();
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Types (Random)</option>
                <option value="type1">Type I Only (Fixed Charge Metals)</option>
                <option value="type2">Type II Only (Variable Charge Metals)</option>
                <option value="type3">Type III Only (Covalent)</option>
              </select>
            </div>

            {currentQuestion && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">{currentQuestion.type}</div>
                  <div className="text-4xl font-bold text-center text-indigo-600 mb-4">
                    {currentQuestion.formula}
                  </div>
                  <div className="text-center text-gray-600 text-sm">
                    Name this compound:
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter compound name (e.g., sodium chloride)"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                    disabled={feedback !== ''}
                  />
                </div>

                {feedback && (
                  <div className={`p-4 rounded-lg ${feedback.startsWith('✓') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <div className="font-semibold mb-2">{feedback}</div>
                    <div className="text-sm mt-2 text-gray-700">
                      {currentQuestion.explanation}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {!feedback ? (
                    <button
                      onClick={checkAnswer}
                      disabled={!userAnswer.trim()}
                      className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={generateQuestion}
                      className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Next Question
                    </button>
                  )}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                  <div className="font-semibold mb-2">Quick Reference:</div>
                  <div><strong>Type I:</strong> Metal (fixed charge) + nonmetal → metal name + anion name</div>
                  <div><strong>Type II:</strong> Metal (variable charge) + nonmetal → metal name(Roman numeral) + anion name</div>
                  <div><strong>Type III:</strong> Nonmetal + nonmetal → prefix + element1 + prefix + element2-ide</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundNamingQuiz;