using System;

namespace AnimalControl.Models
{
    public class Animal
    {
        public Animal(string Name, float Peso, string Cat, string Nasc)
        {
            Id = Guid.NewGuid().ToString();
            name = Name;
            peso = Peso;
            categoria = Cat;
            nascimento = Nasc;
        }

        public string Id { get; private set; }

        public string name { get; private set; }

        public string categoria { get; private set; }

        public float peso { get; private set; }

        public string nascimento { get; private set; }

        
        public void AtualizarAnimal(string Name, float Peso, string Cat, string Nasc)
        {
            name = Name;
            peso = Peso;
            categoria = Cat;
            nascimento = Nasc;
        }
    }
}
