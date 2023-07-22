using System.ComponentModel.DataAnnotations;

namespace MvcWebApp.Models
{
    public class Person
    {
        [Required(ErrorMessage ="id is required")]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int Age { get; set; }

        public Department DepartmentType { get; set; }

        public int Book { get; set; }
    }

    public enum Department
    {
        Civil,
        Mech,
        Cse,
        Eee,
        Ece
    }

    public class Book
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Department Department { get; set; }
    }
}
