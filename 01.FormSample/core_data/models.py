from django.db import models


class User_Details(models.Model):
    family_no = models.IntegerField()
    name = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=20)
    gender = models.CharField(max_length=20)
    age = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'user_details'
        verbose_name = 'User Detail'
        verbose_name_plural = 'User Details'
        ordering = ['-id']

# saves the data form the kobo toolbox
class Response_table(models.Model):
    metadata = models.JSONField()

    # def __str__(self):
    #     return self.metadata

    class Meta:
        db_table = 'response_table'
        verbose_name = 'Response Table'
        verbose_name_plural = 'Response Tables'
        ordering = ['-id']

    
class Studentdetails(models.Model):
    Name = models.CharField(max_length= 20)
    Std_id = models.IntegerField(unique= True)
    Contact = models.IntegerField()
    Email = models.EmailField()
    Age = models.IntegerField()
    Parents_Name = models.CharField(max_length= 20)
    Location = models.CharField()
    Faculty = models.CharField()
    Batch = models.DateField(("Batch"),auto_now = False, auto_now_add = False)

    def __str__(self):
        return self.Name

    class Meta:
        db_table = 'student_details'
        verbose_name = 'Student Detail'
        verbose_name_plural = 'Student Details'
        ordering = ['-id']
    
class Student_fee(models.Model):
    Std_id = models.ForeignKey(Studentdetails,on_delete=models.CASCADE)
    Semester = models.CharField()
    Fee_amount = models.IntegerField()
    Paid_amt = models.IntegerField()
    Due_amt= models.IntegerField()
    Payment_date_and_time = models.DateField(("Paymentd Date and time"),auto_now = False, auto_now_add = False)
 
 
    class Meta:
        db_table = 'student_fee'
        verbose_name = 'Student Fee'
        verbose_name_plural = 'Student Fees'
        ordering = ['-id']