/**
 * Script d'initialisation de la base de données
 */
{
  // Création des collections
  db.createCollection('web_users');
  db.createCollection('recipes');


  // Insertion des recettes
  db.getCollection('recipes').insertMany([
    {
      'title': 'Crêpes',
      'description': 'La crêpe est un mets composé d\'une couche plus ou moins fine de pâte, faite à base de farine (principalement de blé ou de sarrasin) et d\'œufs agglomérés à un liquide (lait, parfois mélangé à de l\'eau ou de la bière). Elle est généralement de forme ronde.',
      'ingredients': [
        {
          'name': 'Oeufs',
          'quantity': 3,
          'unit': "entier(s)",
        },
        {
          'name': 'Farine',
          'quantity': 300,
          'unit': "g",
        },
        {
          'name': 'Sucre',
          'quantity': 300,
          'unit': "cuillière(s) à soupe",
        },
        {
          'name': 'Huile',
          'quantity': 3,
          'unit': "cuillière(s) à soupe",
        },
        {
          'name': 'Beurre fondu',
          'quantity': 2,
          'unit': "g",
        },
        {
          'name': 'Lait',
          'quantity': 60,
          'unit': "cl",
        },
      ],
      'steps': [
        'Mettre la farine dans une terrine et former un puits.',
        'Y déposer les oeufs entiers, le sucre, l\'huile et le beurre.',
        'Mélanger délicatement avec un fouet en ajoutant au fur et à mesure le lait. La pâte ainsi obtenue doit avoir une consistance d\'un liquide légèrement épais.',
        'Parfumer de rhum.',
        'Faire chauffer une poêle antiadhésive et la huiler très légèrement. Y verser une louche de pâte, la répartir dans la poêle puis attendre qu\'elle soit cuite d\'un côté avant de la retourner. Cuire ainsi toutes les crêpes à feu doux.',
      ],
    },
    {
      'title': 'Gaufres',
      'description': 'Une gaufre est un mets de pâte légère cuite entre deux plaques métalliques, articulées entre elles par une ou des charnières, ornées de motifs qui s\'impriment dans la pâte et donnent à la pâtisserie sa forme caractéristique.',
      'ingredients': [
        {
          'name': 'Farine',
          'quantity': 200,
          'unit': "g",
        },
        {
          'name': 'Sucre',
          'quantity': 30,
          'unit': "g",
        },
        {
          'name': 'Oeufs',
          'quantity': 3,
          'unit': "entier(s)",
        },
        {
          'name': 'Beurre',
          'quantity': 20,
          'unit': "g",
        },
        {
          'name': 'Sel',
          'quantity': 1,
          'unit': "g",
        },
        {
          'name': 'Lait',
          'quantity': 25,
          'unit': "cl",
        },
      ],
      'steps': [
        'Mettre la farine dans un saladier, y ajouter le sucre, les jaunes d\'œufs et le beurre ramolli.',
        'Délayer peu à peu le tout en y ajoutant le lait pour qu\'il n\'y ait pas de grumeaux.',
        'Battre les blancs en neige avec une pincée de sel et les ajouter au restant en remuant délicatement.',
        'Cuire le tout dans un gaufrier légèrement beurré.',
      ],
    },
    {
      'title': 'Donuts',
      'description': 'Donut, ou doughnut1, littéralement « noix de pâte », veut dire « beignet sucré » en Amérique du Nord (beigne au Canada francophone), nom masculin, et beignet en Louisiane ainsi que pour les Acadiens. La version la plus courante est de forme torique, à texture dense, souvent couverte d’un glaçage, qui fut popularisée dans les années 1950 par les chaînes de restauration rapide Dunkin’ Donuts et Krispy Kreme. Au Canada, cette pâtisserie est principalement diffusée par la chaîne Tim Hortons.',
      'ingredients': [
        {
          'name': 'Farine',
          'quantity': 500,
          'unit': "g",
        },
        {
          'name': 'Levure Chimique',
          'quantity': 2,
          'unit': "cuillière(s) à café",
        },
        {
          'name': 'Café de sel',
          'quantity': 0.5,
          'unit': "cuillière(s) à café",
        },
        {
          'name': 'Oeuf(s) battu(s)',
          'quantity': 2,
          'unit': "entier(s)",
        },
        {
          'name': 'Sucre',
          'quantity': 175,
          'unit': "g",
        },
        {
          'name': 'Lait',
          'quantity': 15,
          'unit': 'cl'
        },
        {
          'name': 'Beurre fondu',
          'quantity': 15,
          'unit': 'cuillière(s) à soupe'
        },
        {
          'name': 'Vanille liquide',
          'quantity': 1,
          'unit': "cuillière à café",
        },
      ],
      'steps': [
        'Mettre la farine dans un saladier, y ajouter le sucre, les jaunes d\'œufs et le beurre ramolli.',
        'Délayer peu à peu le tout en y ajoutant le lait pour qu\'il n\'y ait pas de grumeaux.',
        'Battre les blancs en neige avec une pincée de sel et les ajouter au restant en remuant délicatement.',
        'Cuire le tout dans un gaufrier légèrement beurré.',
      ],
    },
  ]);

  db.getCollection('recipes').createIndex({ title: 1 }, { unique: true });
  db.getCollection('web_users').createIndex({ login: 1 }, { unique: true });
}
