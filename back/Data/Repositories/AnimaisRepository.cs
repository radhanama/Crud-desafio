using System.Collections.Generic;
using MongoDB.Driver;
using AnimalControl.Data.Configurations;
using AnimalControl.Models;

namespace AnimalControl.Data.Repositories
{
    public class AnimaisRepository : IAnimaisRepository
    {
        private readonly IMongoCollection<Animal> _animais;

        public AnimaisRepository(IDatabaseConfig databaseConfig)
        {
            var client = new MongoClient(databaseConfig.ConnectionString);
            var database = client.GetDatabase(databaseConfig.DatabaseName);

            _animais = database.GetCollection<Animal>("animais");
        }

        public void Adicionar(Animal animal)
        {
            _animais.InsertOne(animal);
        }

        public void Atualizar(string id, Animal animalAtualizada)
        {
            _animais.ReplaceOne(animal => animal.Id == id, animalAtualizada);
        }

        public IEnumerable<Animal> Buscar()
        {
            return _animais.Find(animal => true).ToList();
        }

        public Animal Buscar(string id)
        {
            return _animais.Find(animal => animal.Id == id).FirstOrDefault();
        }

        public void Remover(string id)
        {
            _animais.DeleteOne(animal => animal.Id == id);
        }
    }
}
