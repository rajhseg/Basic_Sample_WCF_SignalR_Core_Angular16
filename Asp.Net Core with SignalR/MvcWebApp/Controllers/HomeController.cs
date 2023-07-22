using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using MvcWebApp.Models;
using System.Diagnostics;

namespace MvcWebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly List<Book> books = new List<Book>();

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            books.Add(new Book { Id = 1, Name = "C#", Department = Department.Cse });
            books.Add(new Book { Id = 2, Name = "Angular", Department = Department.Cse });
            books.Add(new Book { Id = 3, Name = "Electrical 1", Department = Department.Eee });
            books.Add(new Book { Id = 4, Name = "Electrical 2", Department = Department.Eee });
            books.Add(new Book { Id = 5, Name = "Civil 1", Department = Department.Civil });
            books.Add(new Book { Id = 6, Name = "Mech 1", Department = Department.Mech });
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Create()
        {                                   
            return View();
        }

        [HttpPost]
        public JsonResult AjaxBooks(int value)
        {
            var _books = this.books.Where(x => (int)x.Department == value);
            return Json(new { Books = _books});            
        }
          
        [HttpPost]
        public IActionResult Create(Person person)
        {
            if (ModelState.IsValid)
            {
                return RedirectToAction("Index");
            }

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}